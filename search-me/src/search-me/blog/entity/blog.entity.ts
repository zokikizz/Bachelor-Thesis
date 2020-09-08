export interface Blog {
    id: string;
    title: string;
    content: string;
}

export interface BlogItem {
    title: string;
    creationDate: Date;
}

export interface ListResponse {
    blogs: BlogItem[];
}