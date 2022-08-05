"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteComment = exports.addComment = exports.updateComment = exports.getCommentsByBook = exports.getCommentById = exports.getComments = void 0;
const CommentQueries = __importStar(require("./commentQueries"));
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield CommentQueries.getComments();
        res.status(200).json({
            comments
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal error while fetching comments"
        });
    }
});
exports.getComments = getComments;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({
            message: "Id missing"
        });
        return;
    }
    try {
        const comment = yield CommentQueries.getCommentById(+req.params.id);
        res.status(200).json({
            comment
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error while fetching comment"
        });
    }
});
exports.getCommentById = getCommentById;
const getCommentsByBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.book_name) {
        res.status(400).json({
            message: "Book name missing"
        });
        return;
    }
    try {
        const comments = yield CommentQueries.getCommentsByBook(req.params.book_name);
        res.status(200).json({
            comments
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error while fetching comments"
        });
    }
});
exports.getCommentsByBook = getCommentsByBook;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({
            message: "Comment Id missing"
        });
        return;
    }
    try {
        const result = yield CommentQueries.updateComment(Object.assign(Object.assign({}, req.body), { id: req.params.id }));
        if (result) {
            res.status(200).json({
                message: `${result} updated successfully`
            });
        }
        else {
            res.status(501).json({
                message: "Not modified"
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error while updating comments"
        });
    }
});
exports.updateComment = updateComment;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield CommentQueries.addComment(req.body);
        if (result) {
            res.status(200).json({
                message: `Added successfully`
            });
        }
        else {
            res.status(501).json({
                message: "Not modified"
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error while adding comments"
        });
    }
});
exports.addComment = addComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({
            message: "Comment Id missing"
        });
        return;
    }
    try {
        const result = yield CommentQueries.deleteComment(+req.params.id);
        if (result) {
            res.status(200).json({
                message: `Deleted!`
            });
        }
        else {
            res.status(501).json({
                message: "Not modified"
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error while deleting comments"
        });
    }
});
exports.deleteComment = deleteComment;
