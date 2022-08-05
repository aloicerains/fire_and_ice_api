import { sqlExecute } from "../dbConnection";
import { Comment } from "./models";

const CommentQueries = {
    GetComments: `SELECT * FROM comments`,
    GetCommentsByBook: `SELECT * FROM comments WHERE book_name = ?`,
    GetCommentById: `SELECT * FROM comments WHERE id = ?`,
    AddComment: `INSERT INTO comments (book_name, public_ip, comment, comment_date)
        VALUES (?, ?, ?, ?)`,
    UpdateComment: `UPDATE comments SET book_name = ?,
                                        public_ip = ?,
                                        comment = ?,
                                        comment_date = ?
                    WHERE id = ?`,
    DeleteComment: `DELETE FROM comments WHERE id = ?`
};

// get all comments
export const getComments = async () => {
    return sqlExecute<Comment[]>(CommentQueries.GetComments, []);
}

// obtain comment by id
export const getCommentById = async (id: Comment['id']) => {
    return sqlExecute(CommentQueries.GetCommentById, [id]);
}

// obtain comment by book
export const getCommentsByBook = async (book_name: Comment['book_name']) => {
    return sqlExecute(CommentQueries.GetCommentsByBook, [book_name]);
}

// adding a comment
export const addComment = async (comment: Comment) => {
    const result = await sqlExecute<{ affectedRows: number }>(CommentQueries.AddComment, [
        comment.book_name,
        comment.public_ip,
        comment.comment,
        comment.comment_date
    ]);
    return result.affectedRows > 0;
};

// updating a comment
export const updateComment = async (comment: Comment) => {
    const result = await sqlExecute<{ affectedRows: number }>(CommentQueries.UpdateComment, [
        comment.book_name,
        comment.public_ip,
        comment.comment,
        comment.comment_date,
        comment.id
    ]);
    return result.affectedRows > 0;
}
// deleting a comment
export const deleteComment = async (id: Comment['id']) => {
    const result = await sqlExecute<{ affectedRows: number }>(CommentQueries.DeleteComment, [id]);
    return result.affectedRows > 0;
};