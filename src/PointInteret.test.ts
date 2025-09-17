import { Book } from './Event';
import { Bookshelf } from './PointInteret';

describe('Bookshelf', () => {
  const theLordOfTheRings: Book = {
    isbn: '978-0544003415',
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    date: '1954-02-15',
  };
  const theHobbit: Book = {
    isbn: '978-0547928227',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    date: '1937-09-21',
  };
  const Hamlet: Book = {
    isbn: '978-0743477123',
    title: 'Hamlet',
    author: 'William Shakespeare',
    date: '1600',
  };
  const candide: Book = {
    isbn: '978-2081510436',
    title: 'Candide',
    author: 'Voltaire',
    date: '1759',
  };
  const aLaRechercheDuTempsPerdu: Book = {
    isbn: '978-2070107299',
    title: 'À la recherche du temps perdu',
    author: 'Marcel Proust',
    date: '1927',
  };

  let bookshelf: Bookshelf;

  beforeEach(() => {
    bookshelf = new Bookshelf();
  });

  it('should store a book', () => {
    bookshelf.addBook(aLaRechercheDuTempsPerdu);

    expect(bookshelf.getBook('978-2070107299')).toEqual(
      aLaRechercheDuTempsPerdu,
    );
  });

  it('should return all books ordered by `title` (ASC)', () => {
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(Hamlet);

    expect(bookshelf.getAllBooks()).toEqual([
      Hamlet,
      theHobbit,
      theLordOfTheRings,
    ]);
  });

  it('should return all books of a given author', () => {
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(Hamlet);

    const tolkiensBooks = bookshelf.getBooksOf('J. R. R. Tolkien');
    expect(tolkiensBooks.length).toEqual(2);
    expect(tolkiensBooks).toEqual(
      expect.arrayContaining([theLordOfTheRings, theHobbit]),
    );
  });

  it('should return the total number of books', () => {
    bookshelf.addBook(Hamlet);
    bookshelf.addBook(candide);

    expect(bookshelf.getTotalNumberOfBooks()).toEqual(2);
  });

  it('should not duplicate a book already stored', () => {
    bookshelf.addBook(aLaRechercheDuTempsPerdu);
    expect(bookshelf.getTotalNumberOfBooks()).toEqual(1);

    bookshelf.addBook(aLaRechercheDuTempsPerdu);
    expect(bookshelf.getTotalNumberOfBooks()).toEqual(1);
  });
});
