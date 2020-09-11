export interface Blog {
    uiid?: string;
    title?: string;
    content?: string;
    author?: string;
    tags?: string[];
    category?: string;
    creationdate?: Date | number;
    modifieddate?: Date | number;
}

export interface BlogItem {
    title: string;
    creationdate: Date;
}

export interface ListResponse {
    blogs: BlogItem[];
}

export interface Props {
    currentTime;
    month;
    day;
    year;
    hours;
    minutes;
    seconds;
    miliseconds;
    uiid;
}
