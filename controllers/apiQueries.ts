import axios, {  } from 'axios';

import { Book, Books, Characters } from './models';

let Books: Book[];

export const getCharacters =  (book: string[]) => {
    return new Promise((resolve, reject)=> {
        const chara = book.map((url) => {
            axios.get<Characters>(url).then(response => {
                const data: Characters = response.data;
                const info: Characters = {
                    name: data.name,
                    gender: data.gender
                }
                return(info);
            });
        });
        Promise.all(chara).then(data => {
            resolve(data);
        })
        .catch(error=> {
            reject(error);
        });
        
    });
}

export const getBooks = (): Promise<Book[]> => {
    return new Promise((resolve, reject) => {
        axios.get<Books[]>("https://www.anapioficeandfire.com/api/books").then(response => {
        const data: Books[] = response.data;
        Books = data.map(book => {
                const books: Book = {
                    name: book.name,
                    authors: book.authors,
                    released: book.released
                };
                return books;
        });
        return Books
        })
        .then((books)=>{
           resolve(books);
        })
        .catch((error) => {
            reject(error);
        });
    });
    
}

export const getBookCharacters = (id: number): Promise<Characters[]> => {
    return new Promise((resolve, reject) => {
        let characterList: Characters[] = [];
        axios.get<Books>(`https://www.anapioficeandfire.com/api/books/${id}`).then(response => {
            const data: Books = response.data;
            const trial = data.characters.map(url=> {
                return axios.get<Characters>(url).then(res => {
                    const char: Characters = {
                        name: res.data.name,
                        gender: res.data.gender,
                    }
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
}
