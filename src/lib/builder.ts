export type Block =
	| {
			type: 'profile';
			name: string;
			image: string;
			description: string;
	  }
	| {
			type: 'heading';
			level: 1 | 2 | 3 | 4 | 5 | 6;
			text: string;
	  }
	| {
			type: 'paragraph';
			text: string;
	  }
	| {
			type: 'link';
			href: string;
			heading: string;
			image?: string;
			description?: string;
	  }
	| {
			type: 'image';
			src: string;
			alt: string;
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

	addProfile(name: string, image: string, description: string) {
		return this.addBlock({ type: 'profile', name, image, description });
	}
	addHeading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 3) {
		return this.addBlock({ type: 'heading', text, level });
	}
	addParagraph(text: string) {
		return this.addBlock({ type: 'paragraph', text });
	}
	addLink(href: string, heading: string, image?: string, description?: string) {
		return this.addBlock({ type: 'link', href, heading, image, description });
	}
	addImage(src: string, alt: string) {
		return this.addBlock({ type: 'image', src, alt });
	}
}
