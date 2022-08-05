"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.addComment = exports.getCommentsByBook = exports.getCommentById = exports.getComments = void 0;
const dbConnection_1 = require("../dbConnection");
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
const getComments = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, dbConnection_1.sqlExecute)(CommentQueries.GetComments, []);
});
exports.getComments = getComments;
// obtain comment by id
const getCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, dbConnection_1.sqlExecute)(CommentQueries.GetCommentById, [id]);
});
exports.getCommentById = getCommentById;
// obtain comment by book
const getCommentsByBook = (book_name) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, dbConnection_1.sqlExecute)(CommentQueries.GetCommentsByBook, [book_name]);
});
exports.getCommentsByBook = getCommentsByBook;
// adding a comment
const addComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dbConnection_1.sqlExecute)(CommentQueries.AddComment, [
        comment.book_name,
        comment.public_ip,
        comment.comment,
        comment.comment_date
    ]);
    return result.affectedRows > 0;
});
exports.addComment = addComment;
// updating a comment
const updateComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dbConnection_1.sqlExecute)(CommentQueries.UpdateComment, [
        comment.book_name,
        comment.public_ip,
        comment.comment,
        comment.comment_date,
        comment.id
    ]);
    return result.affectedRows > 0;
});
exports.updateComment = updateComment;
// deleting a comment
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, dbConnection_1.sqlExecute)(CommentQueries.DeleteComment, [id]);
    return result.affectedRows > 0;
});
exports.deleteComment = deleteComment;
