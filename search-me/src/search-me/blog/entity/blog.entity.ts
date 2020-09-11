import { Comment } from './../../comments/entity/comment.entity';
export interface Blog {
    uiid?: string;
    filename?: string;
    title?: string;
    content?: string;
    author?: string;
    tags?: string[];
    category?: string;
    creationdate?: Date | number;
    modifieddate?: Date | number;
    comments?: Comment[];
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
