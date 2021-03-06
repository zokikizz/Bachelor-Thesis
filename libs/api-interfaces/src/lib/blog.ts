export class Blog {

    constructor(t = '', c = '', n= '') {
        this.title = t;
        this.content = c;
        this.name = n;
    }
    id?: string;
    title?: string;
    content?: string;
    miniContent: string;
    name?: string;
    // TODO: add imagePath and config for every blog
    imagePath?: string;
    tags?: string[];
    category?: string;
    blogFolder?: string;
    views?: number; // to extract most popular
    createdAt?: Date;
}
