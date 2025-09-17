import { Event } from './Event';

export class PointInteret {
    Table: Event[]=[];
    constructor() {this.Table=[];}
    addEvent(event:Event){
        if(! this.Table.some(b => b.OBJECTID === event.OBJECTID)) //pour s'assurer que l'évènement n'est pas déjà présent dans la base de données
        {
            this.Table.push(event);
        }
    }
    getEventOBJECTID(OBJECTID: number): Event | undefined {
        return this.Table.find(Table => Table.OBJECTID === OBJECTID);
    }
    getAllEvents()
    {
        return this.Table.slice().sort((a,b)=> a.nom_poi.localeCompare(b.nom_poi));
    }
    getEventsByCodePostal(code_postal: number)
    {
        return this.Table.filter(Event => Event.code_postal === code_postal);
    }
    getTotalNumberOfEventsByCat(cat: string)
    {
        switch(cat)
        {
            case "cat0":
                return this.Table.filter(Event => Event.cat0 !== '\0');
            case "cat1":
                return this.Table.filter(Event => Event.cat1 !== '\0');
            case "cat2":
                return this.Table.filter(Event => Event.cat2 !== '\0');
            case "cat3":
                return this.Table.filter(Event => Event.cat3 !== '\0');
            case "cat4":
                return this.Table.filter(Event => Event.cat4 !== '\0');
            case "cat5":
                return this.Table.filter(Event => Event.cat5 !== '\0');
            default:
                console.log("Error");
        }
    }
    removeEvent(OBJECTID: number) {
        this.Table = this.Table.filter(Event => Event.OBJECTID !== OBJECTID);
        return this.Table;
    }

}


