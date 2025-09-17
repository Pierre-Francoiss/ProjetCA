import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Event';
import { Bookshelf } from './PointInteret';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

@Post('books')
addBook(@Body() book:Book):string
{
    this.bookService.addBook(book);
    return "Livre ajouté avec succès !!! Trop fort, tu es si bon en informatique, quelle chance de faire CS !!!!"

}

@Get()
getBooks(@Query('author') author?: string): Book[] {
    if (author)
    {
      return this.bookService.getBooksOf(author);
    }
    return this.bookService.getAllBooks();
  }

@Get(':isbn')
getBook(@Param('isbn') isbn: string):Book | undefined
{
    return this.bookService.getBook(isbn);
}


@Delete(':isbn')
removeBook(@Param('isbn') isbn: string)
{
    return this.bookService.removeBook(isbn);
}
}
