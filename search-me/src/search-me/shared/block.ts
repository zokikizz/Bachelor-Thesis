export class Block {
    tag: string;
    constructor(tag: string) { this.tag = tag; }
    parse(content: string): string {
        return content.match(`<%${this.tag}%>(.*)<%/${this.tag}%>`) ?
            content.match(`<%${this.tag}%>(.*)<%/${this.tag}%>`)[1]
            : null;
    }
    createTag(content: string): string {
        return `<%${this.tag}%>${content}<%/${this.tag}%>`;
    }
}

export interface IBlocks {
    [key: string]: Block;
}
