export interface IBook {
    title: string;
    first_publish_year: number;
    isbn?: string[];
    author_name?: string[];
    number_of_pages_median?: number
}

export interface IBookResponse {
    numFound: number,
    start: number,
    numFoundExact: boolean,
    docs: IBook[],
    q: string
}