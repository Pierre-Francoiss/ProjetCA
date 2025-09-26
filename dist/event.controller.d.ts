import { EventService } from './event.service';
import { Event } from './Event';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    addEvent(event: Event): string;
    listAllEvents(): Promise<Partial<Event>[]>;
    getEventByCodePostal(code_postal?: number): Partial<Event>[];
    getEvent(objectid: number): Event | undefined;
    removeEvent(objectid: number): {
        message: string;
    };
    getTotalNumberOfEventsByCat(categorie: string): Partial<Event>[];
    searchEvent({ term }: {
        term: string;
    }): Event[];
}
