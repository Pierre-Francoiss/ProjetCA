import { Injectable } from '@nestjs/common';
import { HttpService} from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { readFile } from 'fs/promises';
import type { Event } from './Event';
import { apiBook } from './apiBook';

@Injectable()
export class EventService {
    constructor(private readonly httpService: HttpService) {}
    private readonly storage = new Map<number, Event>();

  async onModuleInit() {
    await Promise.all([this.loadEventsFromFile(), this.loadEventsFromApi()]);
  }

private async loadEventsFromFile() {
  const data = await readFile('dataset.json', 'utf8');

  const eventsFromFile = JSON.parse(data.toString()) as Array<{
    objectid: number;
    nom_poi: string;
    description: string;
    url_poi: string;
    cat0: string;
    url0: string;
    cat1: string;
    url1: string;
    cat2: string;
    url2: string;
    cat3: string;
    url3: string;
    cat4: string;
    url4: string;
    cat5: string;
    url5: string;
    classements_poi: string;
    adresse_postal: string;
    code_postal: number;
    commune: string;
    codeinsee: number;
    point_de_contact: string;
    telephone: string;
    email: string;
    site_web: string;
    date_debut: string;
    date_fin: string;
    periode: string;
    periode_regroupee: string;
    covid19_est_en_activite: string;
    covid19_mesures_specifiques: string;
    covid19_periode_d_ouverture: string;
    createur_de_la_donnee: string;
    date_mise_a_jour: string;
    latitude: number;
    longitude: number;
    sit_diffuseur: string;
    codcomm: number;
    codesiret: number;
    source: string;
    datemaj: string;
    geo_shape: string;
    geo_point_2d: string;
    POI: string;
    lien_media: string;
  }>;

  const events: Event[] = eventsFromFile.map(eventData => ({
    OBJECTID: eventData.objectid,
    nom_poi: eventData.nom_poi,
    description: eventData.description,
    url_poi: eventData.url_poi,
    cat0: eventData.cat0,
    url0: eventData.url0,
    cat1: eventData.cat1,
    url1: eventData.url1,
    cat2: eventData.cat2,
    url2: eventData.url2,
    cat3: eventData.cat3,
    url3: eventData.url3,
    cat4: eventData.cat4,
    url4: eventData.url4,
    cat5: eventData.cat5,
    url5: eventData.url5,
    classements_poi: eventData.classements_poi,
    adresse_postal: eventData.adresse_postal,
    code_postal: eventData.code_postal,
    commune: eventData.commune,
    codeinsee: eventData.codeinsee,
    point_de_contact: eventData.point_de_contact,
    telephone: eventData.telephone,
    email: eventData.email,
    site_web: eventData.site_web,
    date_debut: eventData.date_debut,
    date_fin: eventData.date_fin,
    periode: eventData.periode,
    periode_regroupee: eventData.periode_regroupee,
    covid19_est_en_activite: eventData.covid19_est_en_activite,
    covid19_mesures_specifiques: eventData.covid19_mesures_specifiques,
    covid19_periode_d_ouverture: eventData.covid19_periode_d_ouverture,
    createur_de_la_donnee: eventData.createur_de_la_donnee,
    date_mise_a_jour: eventData.date_mise_a_jour,
    latitude: eventData.latitude,
    longitude: eventData.longitude,
    sit_diffuseur: eventData.sit_diffuseur,
    codcomm: eventData.codcomm,
    codesiret: eventData.codesiret,
    source: eventData.source,
    datemaj: eventData.datemaj,
    geo_shape: eventData.geo_shape,
    geo_point_2d: eventData.geo_point_2d,
    POI: eventData.POI,
    lien_media: eventData.lien_media
  }));

  events.forEach(event => this.addEvent(event));
}



async loadEventsFromApi() {
  try {
    const { data } = await firstValueFrom(
      this.httpService.get<{
        total_count: number;
        results: apiBook[];
      }>(
        'https://data.ampmetropole.fr/api/explore/v2.1/catalog/datasets/point-dinteret-datatourisme-multi-niveaux/records?limit=20&refine=niv1_categorie%3A%22F%C3%AAte%20et%20manifestation%22'
      )
    );

    // ⚠️ Utiliser data.results et pas data directement
    data.results
      .map(apiBook => ({
        OBJECTID: apiBook.objectid,
        nom_poi: apiBook.nom_poi,
        description: apiBook.description,
        url_poi: apiBook.url_poi,
        cat0: apiBook.cat0,
        url0: apiBook.url0,
        cat1: apiBook.cat1,
        url1: apiBook.url1,
        cat2: apiBook.cat2,
        url2: apiBook.url2,
        cat3: apiBook.cat3,
        url3: apiBook.url3,
        cat4: apiBook.cat4,
        url4: apiBook.url4,
        cat5: apiBook.cat5,
        url5: apiBook.url5,
        classements_poi: apiBook.classements_poi,
        adresse_postal: apiBook.adresse_postal,
        code_postal: apiBook.code_postal,
        commune: apiBook.commune,
        codeinsee: apiBook.codeinsee,
        point_de_contact: apiBook.point_de_contact,
        telephone: apiBook.telephone,
        email: apiBook.email,
        site_web: apiBook.site_web,
        date_debut: apiBook.date_debut,
        date_fin: apiBook.date_fin,
        periode: apiBook.periode,
        periode_regroupee: apiBook.periode_regroupee,
        covid19_est_en_activite: apiBook.covid19_est_en_activite,
        covid19_mesures_specifiques: apiBook.covid19_mesures_specifiques,
        covid19_periode_d_ouverture: apiBook.covid19_periode_d_ouverture,
        createur_de_la_donnee: apiBook.createur_de_la_donnee,
        date_mise_a_jour: apiBook.date_mise_a_jour,
        latitude: apiBook.latitude,
        longitude: apiBook.longitude,
        sit_diffuseur: apiBook.sit_diffuseur,
        codcomm: apiBook.codcomm,
        codesiret: apiBook.codesiret,
        source: apiBook.source,
        datemaj: apiBook.datemaj,
        geo_shape: apiBook.geo_shape,
        geo_point_2d: apiBook.geo_point_2d,
        POI: apiBook.POI,
        lien_media: apiBook.lien_media,
      }))
      .forEach(event => this.addEvent(event));
  } catch (error: any) {
    console.error(
      'Erreur lors du chargement des événements depuis API :',
      error?.message || error
    );
  }
}

  

    addEvent(event: Event) {
      this.storage.set(event.OBJECTID, event);
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

    removeEvent(objectid: number) {
    this.storage.delete(objectid);
  }

  getTotalNumberOfEvents(): number {
    return this.storage.size;
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

  getTotalNumberOfEventsByCat(cat: string): Event[] | undefined {
  const events = Array.from(this.storage.values());

  switch (cat) {
    case "cat0":
      return events.filter(e => e.cat0 !== '\0');
    case "cat1":
      return events.filter(e => e.cat1 !== '\0');
    case "cat2":
      return events.filter(e => e.cat2 !== '\0');
    case "cat3":
      return events.filter(e => e.cat3 !== '\0');
    case "cat4":
      return events.filter(e => e.cat4 !== '\0');
    case "cat5":
      return events.filter(e => e.cat5 !== '\0');
    default:
      console.error("Catégorie inconnue :", cat);
      return undefined;
  }
}

  search(term: string) 
  {
  return Array.from(this.storage.values())
     .filter((event) => event.nom_poi.includes(term) || event.description.includes(term))
     .sort((a, b) => a.nom_poi.localeCompare(b.nom_poi));
  }
}