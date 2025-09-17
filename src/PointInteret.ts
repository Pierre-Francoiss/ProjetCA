import { Event } from './Event';

export class PointInteret {
    Table: Event[]=[];
    constructor() {this.Event=[];}
    addEvent(event:Event){
        if(! this.Table.some(b => b.OBJECTID === book.OBJECTID)) //pour s'assurer que l'évènement n'est pas déjà présent dans la base de données
        {
            this.Shelf.push(book);
        }
    }
    getBook(isbn: string): Book | undefined {
        return this.Shelf.find(Shelf => Shelf.isbn === isbn);
    }
    getAllBooks()
    {
        return this.Shelf.slice().sort((a,b)=> a.title.localeCompare(b.title));
    }
    getBooksOf(author: string)
    {
        return this.Shelf.filter(Book => Book.author === author);
    }
    getTotalNumberOfBooks(){return this.Shelf.length}
    removeBook(isbn: string) {
        this.Shelf = this.Shelf.filter(book => book.isbn !== isbn);
        return this.Shelf;
    }

}


