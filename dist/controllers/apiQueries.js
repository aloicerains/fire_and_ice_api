"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookCharacters = exports.getBooks = exports.getCharacters = void 0;
const axios_1 = __importDefault(require("axios"));
let Books;
const getCharacters = (book) => {
    return new Promise((resolve, reject) => {
        const chara = book.map((url) => {
            axios_1.default.get(url).then(response => {
                const data = response.data;
                const info = {
                    name: data.name,
                    gender: data.gender
                };
                return (info);
            });
        });
        Promise.all(chara).then(data => {
            resolve(data);
        })
            .catch(error => {
            reject(error);
        });
    });
};
exports.getCharacters = getCharacters;
const getBooks = () => {
    return new Promise((resolve, reject) => {
        axios_1.default.get("https://www.anapioficeandfire.com/api/books").then(response => {
            const data = response.data;
            Books = data.map(book => {
                const books = {
                    name: book.name,
                    authors: book.authors,
                    released: book.released
                };
                return books;
            });
            return Books;
        })
            .then((books) => {
            resolve(books);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.getBooks = getBooks;
const getBookCharacters = (id) => {
    return new Promise((resolve, reject) => {
        let characterList = [];
        axios_1.default.get(`https://www.anapioficeandfire.com/api/books/${id}`).then(response => {
            const data = response.data;
            const trial = data.characters.map(url => {
                return axios_1.default.get(url).then(res => {
                    const char = {
                        name: res.data.name,
                        gender: res.data.gender,
                    };
                    characterList.push(char);
                    return char;
                });
            });
            Promise.all(trial).then(result => {
                resolve(characterList);
            })
                .catch(error => reject(error));
        })
            .catch(error => console.log(error.message));
    });
};
exports.getBookCharacters = getBookCharacters;
