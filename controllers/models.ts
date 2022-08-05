
export interface Comment {
    id: number;
    book_name: string,
    public_ip: string,
    comment: string
    comment_date: string
}

export interface Book {
    name: string,
    authors: string[],
    released: string
}

export interface Characters {
    name: string,
    gender: string
}

export interface Books {
    name: string,
    authors: string[],
    characters: string[],
    released: string
}

export interface finalBook {
    name: string,
    authors: string[],
    comments: number,
    released: string
}