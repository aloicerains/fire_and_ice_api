import { RequestHandler, Request, Response } from 'express'
import * as CommentQueries from './commentQueries'

export const getComments: RequestHandler = async (req: Request, res: Response) => {
    try {
        const comments = await CommentQueries.getComments();
        res.status(200).json({
            comments
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error while fetching comments"
        });
    }
};

export const getCommentById: RequestHandler = async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({
            message: "Id missing"
        })
        return;
    }
    try {
        const comment = await CommentQueries.getCommentById(+req.params.id);
        if (comment) {
            res.status(200).json({
                comment
            });
        } else {
            res.status(404).json({
                message: "Not found!"
            });
        }
    } catch (error){
        console.error(error.message)
        res.status(500).json({
            message: "Internal error while fetching comment"
        });
    }
};

export const getCommentsByBook: RequestHandler = async (req: Request, res: Response) => {
    if (!req.query.book_name) {
        res.status(400).json({
            message: "Book name missing"
        })
        return;
    }
    try {
        const comments = await CommentQueries.getCommentsByBook(req.query.book_name.toString());
        if (comments) {
            res.status(200).json({
                comments
            });
        } else {
            res.status(404).json({
                message: "Not found!"
            });
        }
        res.status(200).json({
            comments
        });
    } catch (error){
        console.error(error.message)
        res.status(500).json({
            message: "Internal error while fetching comments"
        });
    }

};

export const updateComment: RequestHandler = async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({
            message: "Comment Id missing"
        })
        return;
    }
    //const date: string = new Date().toUTCString(); inject it in update and addcomment.
    try {
        const public_ip: string = req.socket.remoteAddress;
        const comment_date: string = new Date().toUTCString();
        const result = await CommentQueries.updateComment({ ...req.body, public_ip, comment_date, id: req.params.id });
        if (result) {
            res.status(200).json({
                message: `${result} updated successfully`
            });
        } else {
            res.status(501).json({
                message: "Not modified"
            });
        }
    } catch (error){
        console.error(error.message)
        res.status(500).json({
            message: "Internal error while updating comments"
        });
    }
};

export const addComment: RequestHandler = async (req: Request, res: Response) => {
    try {
        const public_ip: string = req.socket.remoteAddress;
        const comment_date: string = new Date().toUTCString();
        const result = await CommentQueries.addComment({...req.body, public_ip, comment_date });

        if (result) {
            res.status(200).json({
                message: `Added successfully`
            });
        } else {
            res.status(501).json({
                message: "Not modified"
            });
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Internal error while adding comments"
        });
    }
};

export const deleteComment: RequestHandler = async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({
            message: "Comment Id missing"
        })
        return;
    }
    try {
        const result = await CommentQueries.deleteComment(+req.params.id);
        if (result) {
            res.status(200).json({
                message: `Deleted!`
            });
        } else {
            res.status(501).json({
                message: "Not modified"
            });
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Internal error while deleting comments"!
        });
    }
};