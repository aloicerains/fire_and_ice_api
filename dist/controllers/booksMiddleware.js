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
exports.getCharacters = exports.getBooks = void 0;
const api = __importStar(require("./apiQueries"));
const commentQueries_1 = require("./commentQueries");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield api.getBooks();
        let newBooks = [];
        const resultBooks = books.map(book => {
            let newBook;
            return (0, commentQueries_1.getCommentsByBook)(book.name).then((result) => {
                newBook = Object.assign(Object.assign({}, book), { comments: result.length | 0 });
                return newBook;
            })
                .then((b) => {
                newBooks.push(b);
            })
                .catch((error) => console.error(error.message));
        });
        Promise.all(resultBooks).then(() => {
            res.status(200).json({
                newBooks
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal error when retrieving books"
        });
    }
});
exports.getBooks = getBooks;
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characters = yield api.getBookCharacters(+req.params.id);
        res.status(200).json({
            characters
        });
    }
    catch (error) {
        console.log(error.meessage);
    }
});
exports.getCharacters = getCharacters;
