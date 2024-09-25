import { generateIdFromEntropySize } from "lucia";
import { Heading as H, Image as I, Link as L, Pilcrow as P, User as U } from "lucide-svelte";

import type { ComponentType } from "svelte";
import { z } from "zod";

export const ProfileSchema = z.object({
	name: z.string(),
	image: z.string(),
	bio: z.string()
});
export type Profile = z.infer<typeof ProfileSchema>;
export const isProfile = (data: unknown): data is Profile => {
	if (typeof data === "object" && data !== null) {
		return "name" in data && "image" in data && "bio" in data;
	}
	return false;
};

export const HeadingSchema = z.object({
	level: z.number().optional(),
	text: z.string()
});
export type Heading = z.infer<typeof HeadingSchema>;
export const isHeading = (data: unknown): data is H => {
	if (typeof data === "object" && data !== null) {
		return "text" in data;
	}
	return false;
};

export const ParagraphSchema = z.object({
	text: z.string()
});
export type Paragraph = z.infer<typeof ParagraphSchema>;
export const isParagraph = (data: unknown): data is Paragraph => {
	if (typeof data === "object" && data !== null) {
		return "text" in data;
	}
	return false;
};

export const LinkSchema = z.object({
	href: z.string(),
	heading: z.string(),
	image: z.string().optional(),
	subtext: z.string().optional()
});
export type Link = z.infer<typeof LinkSchema>;
export const isLink = (data: unknown): data is L => {
	if (typeof data === "object" && data !== null) {
		return "href" in data && "heading" in data;
	}
	return false;
};

export const ImageSchema = z.object({
	src: z.string(),
	alt: z.string(),
	height: z.number().optional(),
	text: z.string().optional(),
	href: z.string().optional()
});
export type Image = z.infer<typeof ImageSchema>;
export const isImage = (data: unknown): data is I => {
	if (typeof data === "object" && data !== null) {
		return "src" in data && "alt" in data;
	}
	return false;
};

export const BlockSchema = z.union([
	z.object({
		_id: z.string(),
		id: z.string().optional(),
		type: z.literal("profile"),
		data: ProfileSchema
	}),
	z.object({
		_id: z.string(),
		id: z.string().optional(),
		type: z.literal("heading"),
		data: HeadingSchema
	}),
	z.object({
		_id: z.string(),
		id: z.string().optional(),
		type: z.literal("paragraph"),
		data: ParagraphSchema
	}),
	z.object({
		_id: z.string(),
		id: z.string().optional(),
		type: z.literal("link"),
		data: LinkSchema
	}),
	z.object({
		_id: z.string(),
		id: z.string().optional(),
		type: z.literal("image"),
		data: ImageSchema
	})
]);
export type Block = z.infer<typeof BlockSchema>;
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

export class Builder {
	private _id: string;
	get id() {
		return this._id;
	}

	name: string;
	slug: string;
	blocks: Block[];

	constructor(
		blocks: Block[] = [],
		page: { name: string; slug: string; id: string } = { name: "", slug: "", id: "" }
	) {
		this.blocks = blocks;
		this.name = page.name;
		this.slug = page.slug;
		this._id = page.id;
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
