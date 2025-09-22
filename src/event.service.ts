import { Injectable } from '@nestjs/common';
import { HttpService} from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { Event } from './Event';

interface ApiBook {
  objectid: number;
  code_postal: number;
  nom_poi: string;
  url_poi: string;
  description: string;
  cat0: string;
  cat1: string;
  cat2: string;
  cat3: string;
  cat4: string;
  cat5: string;
  adresse_postal: string;
  commune: string;
  telephone: string;
  email: string;
  site_web: string;
  latitude: string;
  longitude: string;
  lien_media: string;
}

@Injectable()
export class EventService {
    private _event: Event[] = [];
    constructor(private readonly httpService: HttpService) {}
    private storage = new Map<number, Event>();

    private async loadFromApi(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<ApiBook[]>('https://data.ampmetropole.fr/api/explore/v2.1/catalog/datasets/point-dinteret-datatourisme-multi-niveaux/records?limit=20&refine=niv1_categorie%3A%22F%C3%AAte%20et%20manifestation%22')
      );

      if (response.data) {
        const interet: any = response.data.map(apiBook => ({
           description: apiBook.description,
                nom_poi: apiBook.nom_poi,
                objectid: apiBook.objectid,
                url_poi: apiBook.url_poi,
                cat0: apiBook.cat0,
                cat1: apiBook.cat1,
                cat2: apiBook.cat2,
                cat3: apiBook.cat3,
                cat4: apiBook.cat4,
                cat5: apiBook.cat5,
                adresse_postal: apiBook.adresse_postal,
                code_postal: apiBook.code_postal,
                commune: apiBook.commune,
                telephone: apiBook.telephone,
                email: apiBook.email,
                site_web: apiBook.site_web,
                latitude: apiBook.latitude,
                longitude: apiBook.longitude,
                lien_media: apiBook.lien_media
        }));

        interet.forEach(event => this.addEvent(event));
        console.log(`Loaded ${interet.length} books from remote API`);
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement des livres depuis API :', error.message);
    }
  }

  private async loadEventsFromFile(filePath: string): Promise<void> {
    try {
      const data = await readFile(fileURLToPath(filePath), 'utf-8');
      const events: Event[] = JSON.parse(data);

      events.forEach(event => this.addEvent(event));
      console.log(`Loaded ${events.length} books from local file`);
    } catch (err) {
      console.error('Erreur lors du chargement du fichier local :', err);
    }
  }

    addEvent(event: Event) {
      if (!this._event.some(b => b.OBJECTID === event.OBJECTID)) {
      this._event.push(event);
      this.storage.set(event.OBJECTID, event);
    }
    }

    getEvent(objectid: number): Event | undefined {
        return this.storage.get(objectid);
    }

    getAllEvents(): Partial<Event>[] {
        return Array.from(this.storage.values()).map(event => ({
            objectid: event.OBJECTID,
            nom_poi: event.nom_poi,
            description: event.description,
            url_poi: event.url_poi,
            code_postal: event.code_postal,
        }));
    }

    removeEvent(objectid: number): Event[] {
    this._event = this._event.filter(event => event.OBJECTID !== objectid);
    this.storage.delete(objectid);
    return this._event;
  }

  getTotalNumberOfEvents(): number {
    return this._event.length;
  }

  getEventByCodePostal(code_postal: number): Partial<Event>[] {
  return Array.from(this.storage.values())
    .filter(event => event.code_postal === code_postal)
    .map(event => ({
      objectid: event.OBJECTID,
      nom_poi: event.nom_poi,
      description: event.description,
      url_poi: event.url_poi,
      code_postal: event.code_postal,
    }));
}

  getTotalNumberOfEventsByCat(cat: string): Partial<Event>[] | undefined
    {
        switch(cat)
        {
            case "cat0":
                return this._event.filter(Event => Event.cat0 !== '\0');
            case "cat1":
                return this._event.filter(Event => Event.cat1 !== '\0');
            case "cat2":
                return this._event.filter(Event => Event.cat2 !== '\0');
            case "cat3":
                return this._event.filter(Event => Event.cat3 !== '\0');
            case "cat4":
                return this._event.filter(Event => Event.cat4 !== '\0');
            case "cat5":
                return this._event.filter(Event => Event.cat5 !== '\0');
            default:
                console.log("Error");
        }  
    }
  search(term: string) 
  {
  return Array.from(this.storage.values())
     .filter((event) => event.nom_poi.includes(term) || event.description.includes(term))
     .sort((a, b) => a.nom_poi.localeCompare(b.nom_poi));
  }
}