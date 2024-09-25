import { generateIdFromEntropySize } from "lucia";
import { Heading as H, Image as I, Link as L, Pilcrow as P, User as U } from "lucide-svelte";

import type { ComponentType } from "svelte";

export type Block = { _id: string; id?: string } & (
	| {
			type: "profile";
			data: Profile;
	  }
	| {
			type: "heading";
			data: Heading;
	  }
	| {
			type: "paragraph";
			data: Paragraph;
	  }
	| {
			type: "link";
			data: Link;
	  }
	| {
			type: "image";
			data: Image;
	  }
);
export const blockTypes: { type: Block["type"]; icon: ComponentType }[] = [
	{
		type: "profile",
		icon: U
	},
	{
		type: "heading",
		icon: H
	},
	{
		type: "paragraph",
		icon: P
	},
	{
		type: "link",
		icon: L
	},
	{
		type: "image",
		icon: I
	}
] as const;

export type Profile = {
	name: string;
	image: string;
	bio: string;
};
export const isProfile = (data: unknown): data is Profile => {
	if (typeof data === "object" && data !== null) {
		return "name" in data && "image" in data && "bio" in data;
	}
	return false;
};

export type Heading = {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	text: string;
};
export const isHeading = (data: unknown): data is H => {
	if (typeof data === "object" && data !== null) {
		return "text" in data;
	}
	return false;
};

export type Paragraph = {
	text: string;
};
export const isParagraph = (data: unknown): data is Paragraph => {
	if (typeof data === "object" && data !== null) {
		return "text" in data;
	}
	return false;
};

export type Link = {
	href: string;
	heading: string;
	image?: string;
	subtext?: string;
};
export const isLink = (data: unknown): data is L => {
	if (typeof data === "object" && data !== null) {
		return "href" in data && "heading" in data;
	}
	return false;
};

export type Image = {
	src: string;
	alt: string;
	height?: number;
	text?: string | undefined;
	href?: string | undefined;
};
export const isImage = (data: unknown): data is I => {
	if (typeof data === "object" && data !== null) {
		return "src" in data && "alt" in data;
	}
	return false;
};

export class Builder {
	blocks: Block[];

	constructor(blocks: Block[] = []) {
		this.blocks = blocks;
	}

	add(type: Block["type"], at?: number) {
		if (type === "profile") return this.addProfile(undefined, at);
		if (type === "heading") return this.addHeading(undefined, at);
		if (type === "paragraph") return this.addParagraph(undefined, at);
		if (type === "link") return this.addLink(undefined, at);
		if (type === "image") return this.addImage(undefined, at);

		throw new Error("Not implemented");
	}
	private addBlock(data: Block, at = -1) {
		if (at < 0) this.blocks.push(data);
		else this.blocks.splice(at, 0, data);

		return this;
	}
	addProfile(data: Profile = { image: "", name: "", bio: "" }, at?: number) {
		return this.addBlock({ _id: generateIdFromEntropySize(10), type: "profile", data }, at);
	}
	addHeading(data: Heading = { text: "" }, at?: number) {
		return this.addBlock({ _id: generateIdFromEntropySize(10), type: "heading", data }, at);
	}
	addParagraph(data: Paragraph = { text: "" }, at?: number) {
		return this.addBlock({ _id: generateIdFromEntropySize(10), type: "paragraph", data }, at);
	}
	addLink(data: Link = { heading: "", href: "" }, at?: number) {
		return this.addBlock({ _id: generateIdFromEntropySize(10), type: "link", data }, at);
	}
	addImage(data: Image = { src: "", alt: "" }, at?: number) {
		return this.addBlock({ _id: generateIdFromEntropySize(10), type: "image", data }, at);
	}

	delete(id: string) {
		const index = this.findIndex(id);

		console.log(this.blocks.length);
		this.blocks.splice(index, 1);
		console.log(this.blocks.length);

		return this;
	}

	find(id: string) {
		return this.blocks.find((block) => block._id === id);
	}
	findIndex(id: string) {
		return this.blocks.findIndex((block) => block._id === id);
	}
}
