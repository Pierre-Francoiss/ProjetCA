import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { Event } from 'src/Event';
import {askForProjectName} from "@nestjs/cli/lib/utils/project-utils";

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

        const events = data.results ?? [];

        events
            .map((event: any) => ({
                description: event.description,
                nom_poi: event.nom_poi,
                objectid: event.objectid,
                url_poi: event.url_poi,
                cat0: event.cat0, //Les cinq catégories hiérarchisées permettent de qualifier l'évènement de plus en précisément
                cat1: event.cat1,
                cat2: event.cat2,
                cat3: event.cat3,
                cat4: event.cat4,
                cat5: event.cat5,
                adresse_postal: event.adresse_postal,
                code_postal: event.code_postal,
                commune: event.commune,
                telephone: event.telephone,
                email: event.email,
                site_web: event.site_web,
                latitude: event.latitude,
                longitude: event.longitude,
                lien_media: event.lien_media,
                favori: false,
            }))
            .forEach((event: Event) => this.addEvent(event));
    }


    addEvent(event: Event) {
        this.storage.set(event.objectid, event);
    }

    getEvent(objectid: number): Event {
        console.log(`Getting event: ${objectid}`);
        console.log(typeof objectid === 'string');
        console.log(this.storage);
        console.log((this.storage)[objectid]);
        console.log(this.storage.get(objectid));
        const event = this.storage.get(objectid);

        if (!event) {
            throw new Error(`Event with objectid: ${objectid} not found`);
        }
        return event;
    }

    getAllEvents(): Partial<Event>[] {
        return Array.from(this.storage.values()).map(event => ({
            objectid: event.objectid,
            nom_poi: event.nom_poi,
            description: event.description,
            url_poi: event.url_poi,
            favori: event.favori,
        }));
    }

    setFav(objectid: number, value: boolean) {
        const event = this.storage.get(objectid);
        if (!event) {
            throw new Error(`Event with objectid ${objectid} not found`);
        }
        event.favori = value;
    }

    getFavs(): Partial<Event>[] {
        return Array.from(this.storage.values()).filter(event => event.favori).map(event => ({
            objectid: event.objectid,
            nom_poi: event.nom_poi,
            description: event.description,
            url_poi: event.url_poi,
        }));

    }

    getByPostalCode(code: string): Partial<Event>[] {
        console.log(`code postal: ${code}`);
        console.log(typeof code === 'string');
        console.log( Number(code));
        console.log(Array.from(this.storage.values()).filter(event => event.code_postal === code))
        return Array.from(this.storage.values()).filter(event => event.code_postal === code).map(event => ({
                objectid: event.objectid,
                nom_poi: event.nom_poi,
                description: event.description,
                url_poi: event.url_poi,
                favori: event.favori,
                code_postal: event.code_postal,
            }));
    }


}
