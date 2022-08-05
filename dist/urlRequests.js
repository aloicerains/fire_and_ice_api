"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function getCharacters(url) {
    return new Promise(resolve => {
        axios_1.default.get(url).then(response => {
            const data = response.data;
            const info = {
                name: data.name,
                gender: data.gender
            };
            resolve(info);
        })
            .catch(error => {
            console.log(error);
        });
    });
}
let Books = [];
axios_1.default.get("https://www.anapioficeandfire.com/api/books").then(response => {
    const data = response.data;
    Books = data.map(book => {
        const books = {
            name: book.name,
            authors: book.authors,
            characters: book.characters,
            released: book.released
        };
        return books;
    });
})
    .then(() => {
    //const arr = arr3.map(book => getCharacters(book));
    //Promise.all(arr).then(data => console.log(data));
    // const trial = arr.map(data => getCharacters(data));
    // Promise.all(trial).then(data => console.log(data));
})
    .then(() => {
    //console.log(Books);
})
    .catch((error) => {
    console.error(error);
});
