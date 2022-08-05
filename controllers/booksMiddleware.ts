import { RequestHandler, Request, Response } from 'express';
import * as api from './apiQueries';
import { finalBook } from './models';
import { getCommentsByBook } from './commentQueries';

export const getBooks: RequestHandler = async (req: Request, res: Response) => {
    try {
       
        const books = await api.getBooks();
        let newBooks: finalBook[] = [];
        const resultBooks = books.map(book => {
            let newBook: finalBook;
            return getCommentsByBook(book.name).then((result: string[])=>{
                newBook = {
                    ...book,
                    comments: result.length | 0
                }
                return newBook;
            })
            .then((b) => {
                newBooks.push(b);
            })
            .catch ((error)=> console.error(error.message));
        });
        Promise.all(resultBooks).then(() => {
            res.status(200).json({
                newBooks
            });
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error when retrieving books"
        });
    }
};

export const getCharacters: RequestHandler = async (req: Request, res: Response) => {
    try {
        const characters = await api.getBookCharacters(+req.params.id);
        res.status(200).json({
            characters
        });
    } catch (error) {
        console.log(error.meessage);
    }
};