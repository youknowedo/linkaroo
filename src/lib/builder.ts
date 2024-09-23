export type Block =
	| {
			class: 'profile';
			name: string;
			image: string;
			description: string;
	  }
	| {
			class: 'heading';
			level: 1 | 2 | 3 | 4 | 5 | 6;
			text: string;
	  }
	| {
			class: 'paragraph';
			text: string;
	  }
	| {
			class: 'link';
			href: string;
			heading: string;
			image?: string;
			description?: string;
	  }
	| {
			class: 'image';
			src: string;
			alt: string;
			height: number;
			text: string | undefined;
			href: string | undefined;
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
		return this.addBlock({ class: 'profile', name, image, description });
	}
	addHeading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 3) {
		return this.addBlock({ class: 'heading', text, level });
	}
	addParagraph(text: string) {
		return this.addBlock({ class: 'paragraph', text });
	}
	addLink(href: string, heading: string, image?: string, description?: string) {
		return this.addBlock({ class: 'link', href, heading, image, description });
	}
	addImage(src: string, alt: string, href?: string, text?: string, height: number = 300) {
		return this.addBlock({ class: 'image', src, alt, height, text, href });
	}
}
