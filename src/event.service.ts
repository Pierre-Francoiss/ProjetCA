import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { Event } from 'src/Event';

@Injectable()
export class EventService implements OnModuleInit {
    constructor(private readonly httpService: HttpService) {}

    private readonly storage: Map<number, Event> = new Map();

    async onModuleInit() {
        await Promise.all([this.loadEventsFromApi()]);
    }


    async loadEventsFromApi() {
        const { data } = await firstValueFrom(
            this.httpService.get(
                'https://data.ampmetropole.fr/api/explore/v2.1/catalog/datasets/point-dinteret-datatourisme-multi-niveaux/records?limit=20&refine=niv1_categorie%3A%22F%C3%AAte%20et%20manifestation%22',
            ),
        );

        const events = data.results ?? []; // 👈 tableau d’événements

        events
            .map((event: any) => ({
                nom_poi: event.nom_poi,
                description: event.description,
                url_poi: event.url_poi,
                objectid: event.objectid, // ⚠️ dans l’API la clé est `objectid` en minuscule
            }))
            .forEach((event: Event) => this.addEvent(event));
    }


    addEvent(event: Event) {
        this.storage.set(event.objectid, event);
    }

    getEvent(objectid: number): Event {
        const event = this.storage.get(objectid);

        if (!event) {
            throw new Error('Event with objectid ${objectid} not found');
        }
        return event;
    }

    getAllEvents(): Event[] {
        return Array.from(this.storage.values()
        );
    }

}
