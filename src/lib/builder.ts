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

export type Heading = {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	text: string;
};

export type Paragraph = {
	text: string;
};

export type Link = {
	href: string;
	heading: string;
	image?: string;
	subtext?: string;
};

export type Image = {
	src: string;
	alt: string;
	height?: number;
	text?: string | undefined;
	href?: string | undefined;
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
