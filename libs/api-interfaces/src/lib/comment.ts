export class Comment {

    constructor(name = '',
        email: string = '',
        comment: string = '',
        blogId: string = '',
        date = Date.now()) {
        this.name = name;
        this.email = email;
        this.comment = comment;
        this.blogId = blogId;
        this.date = date;
    }
    
    name?: string;
    email?: string;
    comment: string;
    blogId?: string;
    date?;
    isApproved?: boolean;


}