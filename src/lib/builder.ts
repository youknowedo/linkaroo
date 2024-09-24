export type Block =
	| {
			type: 'profile';
			data: Profile;
	  }
	| {
			type: 'heading';
			data: Heading;
	  }
	| {
			type: 'paragraph';
			data: Paragraph;
	  }
	| {
			type: 'link';
			data: Link;
	  }
	| {
			type: 'image';
			data: Image;
	  };

export type Profile = {
	name: string;
	image: string;
	bio: string;
};
export const isProfile = (data: unknown): data is Profile => {
	if (typeof data === 'object' && data !== null) {
		return 'name' in data && 'image' in data && 'bio' in data;
	}
	return false;
};

export type Heading = {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	text: string;
};
export const isHeading = (data: unknown): data is Heading => {
	if (typeof data === 'object' && data !== null) {
		return 'text' in data;
	}
	return false;
};

export type Paragraph = {
	text: string;
};
export const isParagraph = (data: unknown): data is Paragraph => {
	if (typeof data === 'object' && data !== null) {
		return 'text' in data;
	}
	return false;
};

export type Link = {
	href: string;
	heading: string;
	image?: string;
	subtext?: string;
};
export const isLink = (data: unknown): data is Link => {
	if (typeof data === 'object' && data !== null) {
		return 'href' in data && 'heading' in data;
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
export const isImage = (data: unknown): data is Image => {
	if (typeof data === 'object' && data !== null) {
		return 'src' in data && 'alt' in data;
	}
	return false;
};

export class Builder {
	blocks: Block[];

	constructor(blocks: Block[] = []) {
		this.blocks = blocks;
	}

	private addBlock(data: Block) {
		this.blocks.push(data);
		return this;
	}

	addProfile(data: Profile) {
		return this.addBlock({ type: 'profile', data });
	}
	addHeading(data: Heading) {
		return this.addBlock({ type: 'heading', data });
	}
	addParagraph(data: Paragraph) {
		return this.addBlock({ type: 'paragraph', data });
	}
	addLink(data: Link) {
		return this.addBlock({ type: 'link', data });
	}
	addImage(data: Image) {
		return this.addBlock({ type: 'image', data });
	}
}
