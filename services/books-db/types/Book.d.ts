/**
 * Book
 * A Book
 */
declare interface Book {
    id?: string;
    authorId?: string | null;
    createdAt?: string | null;
    datePublished: string;
    imgLink?: string | null;
    isbn?: string | null;
    pageCount?: number | null;
    publisherId?: string | null;
    title: string;
}
export { Book };
