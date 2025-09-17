import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { Book } from './Event';

interface ApiBook {
  isbn: string;
  title: string;
  authors: string;
  num_pages?: string;
  publisher?: string;
  language_code?: string;
  publication_date: string;
}

@Injectable()
export class BookService {
  private shelf: Book[] = [];
  private booksByIsbn = new Map<string, Book>();

  constructor(private readonly httpService: HttpService) {}

  addBook(book: Book) {
    if (!this.shelf.some(b => b.isbn === book.isbn)) {
      this.shelf.push(book);
      this.booksByIsbn.set(book.isbn, book);
    }
  }

  getBook(isbn: string): Book | undefined {
    return this.booksByIsbn.get(isbn);
  }

  getAllBooks(): Book[] {
    return this.shelf.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  getBooksOf(author: string): Book[] {
    return this.shelf.filter(book => book.author === author);
  }

  getTotalNumberOfBooks(): number {
    return this.shelf.length;
  }

  removeBook(isbn: string): Book[] {
    this.shelf = this.shelf.filter(book => book.isbn !== isbn);
    this.booksByIsbn.delete(isbn);
    return this.shelf;
  }

  private async loadFromApi(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<ApiBook[]>('https://api.npoint.io/fbb2a6039fc21e320b30')
      );

      if (response.data) {
        const books: Book[] = response.data.map(apiBook => ({
          isbn: apiBook.isbn,
          title: apiBook.title,
          author: apiBook.authors,
          date: apiBook.publication_date,
        }));

        books.forEach(book => this.addBook(book));
        console.log(`Loaded ${books.length} books from remote API`);
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement des livres depuis API :', error.message);
    }
  }

  private async loadBooksFromFile(filePath: string): Promise<void> {
    try {
      const data = await readFile(fileURLToPath(filePath), 'utf-8');
      const books: Book[] = JSON.parse(data);

      books.forEach(book => this.addBook(book));
      console.log(`Loaded ${books.length} books from local file`);
    } catch (err) {
      console.error('Erreur lors du chargement du fichier local :', err);
    }
  }
}
