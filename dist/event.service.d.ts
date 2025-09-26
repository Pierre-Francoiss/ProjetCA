import { HttpService } from '@nestjs/axios';
import type { Event } from './Event';
export declare class EventService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly storage;
    onModuleInit(): Promise<void>;
    private loadEventsFromFile;
    loadEventsFromApi(): Promise<void>;
    addEvent(event: Event): void;
    getEvent(objectid: number): Event | undefined;
    getAllEvents(): Partial<Event>[];
    removeEvent(objectid: number): void;
    getTotalNumberOfEvents(): number;
    getEventByCodePostal(code_postal: number): Partial<Event>[];
    getTotalNumberOfEventsByCat(cat: string): Event[] | undefined;
    search(term: string): Event[];
}
