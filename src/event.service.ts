import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { Events } from 'src/Events';

@Injectable()
export class BookService implements OnModuleInit {
    constructor(private readonly httpService: HttpService) {}

    private readonly storage: Map<string, Book> = new Map();

    async onModuleInit() {
        await Promise.all([this.loadBooksFromFile(), this.loadBooksFromApi()]);
    }

    private async loadBooksFromFile() {
        const data = await readFile('src/dataset.json', 'utf8');
        const books = JSON.parse(data.toString()) as Book[];
        books.forEach((book) => this.addBook(book));
    }

    async loadBooksFromApi() {
        const { data } = await firstValueFrom(
            this.httpService.get<ApiBook[]>(
                'https://api.npoint.io/fbb2a6039fc21e320b30',
            ),
        );

        data
            .map((apiBook) => ({
                author: apiBook.authors,
                date: apiBook.publication_date,
                isbn: apiBook.isbn,
                title: apiBook.title,
            }))
            .forEach(this.addBook);
    }

    async loadBooksFromApiObservable() {
        this.httpService
            .get<ApiBook[]>('https://api.npoint.io/fbb2a6039fc21e320b30')
            .pipe(
                map((response) => response.data),
                map((apiBooks) =>
                    apiBooks.map((apiBook) => ({
                        author: apiBook.authors,
                        date: apiBook.publication_date,
                        isbn: apiBook.isbn,
                        title: apiBook.title,
                    })),
                ),
                tap((books) => books.forEach((book) => this.addBook(book))),
            )
            .subscribe();
    }

    addBook(book: Book) {
        this.storage.set(book.isbn, book);
    }

    getBook(isbn: string): Book {
        const book = this.storage.get(isbn);

        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }
        return book;
    }

    getAllBooks(): Book[] {
        return Array.from(this.storage.values()).sort((a, b) =>
            a.title.localeCompare(b.title),
        );
    }

    getBooksOf(author: string): Book[] {
        return this.getAllBooks()
            .filter((book) => book.author === author)
            .sort((a, b) => a.title.localeCompare(b.title));
    }

    remove(isbn: string) {
        this.storage.delete(isbn);
    }

    search(term: string) {
        return Array.from(this.storage.values())
            .filter((book) => book.title.includes(term) || book.author.includes(term))
            .sort((a, b) => a.title.localeCompare(b.title));
    }
}
