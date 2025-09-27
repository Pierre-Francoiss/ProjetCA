import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type supertest from 'supertest';
import { EventModule } from '../src/event.module';

describe('Events API', () => {
    let app: INestApplication;
    let httpRequester: supertest.Agent;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [EventModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        httpRequester = request(app.getHttpServer());
    });

    it('GET /events', async () => {
        const response = await httpRequester.get('/events').expect(200);

        expect(response.body).toEqual(expect.any(Array));
        expect(response.body[0]).toHaveProperty('objectid');
        expect(response.body[0]).toHaveProperty('nom_poi');
    });

    it('POST /events', async () => {
        const response = await httpRequester
            .post('/events')
            .send({
                objectid: 123456,
                nom_poi: 'Salon du Livre',
                description: 'Un salon du livre avec de nombreux auteurs invités.',
                url_poi: 'http://salon-livre.com',
                cat0: 'Culture',
                cat1: 'Salon',
                cat2: 'Livre',
                cat3: 'Littérature',
                cat4: 'Rencontres',
                cat5: 'Auteurs',
                adresse_postal: 'Palais des Congrès, Marseille',
                code_postal: '13008',
                commune: 'Marseille',
                telephone: '0491000000',
                email: 'contact@salon-livre.com',
                site_web: 'http://salon-livre.com',
                latitude: 43.2705,
                longitude: 5.3955,
                lien_media: 'http://salon-livre.com/image.jpg',
                favori: false,
            })
            .expect(201);

        expect(response.body).toEqual({
            objectid: 123456,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
            cat0: 'Culture',
            cat1: 'Salon',
            cat2: 'Livre',
            cat3: 'Littérature',
            cat4: 'Rencontres',
            cat5: 'Auteurs',
            adresse_postal: 'Palais des Congrès, Marseille',
            code_postal: '13008',
            commune: 'Marseille',
            telephone: '0491000000',
            email: 'contact@salon-livre.com',
            site_web: 'http://salon-livre.com',
            latitude: 43.2705,
            longitude: 5.3955,
            lien_media: 'http://salon-livre.com/image.jpg',
            favori: false,
        });
    });

    it('GET /events/:objectid', async () => {
        // Ajout d'un événement de test
        await httpRequester.post('/events').send({
            objectid: 123456,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
            cat0: 'Culture',
            cat1: 'Salon',
            cat2: 'Livre',
            cat3: 'Littérature',
            cat4: 'Rencontres',
            cat5: 'Auteurs',
            adresse_postal: 'Palais des Congrès, Marseille',
            code_postal: '13008',
            commune: 'Marseille',
            telephone: '0491000000',
            email: 'contact@salon-livre.com',
            site_web: 'http://salon-livre.com',
            latitude: 43.2705,
            longitude: 5.3955,
            lien_media: 'http://salon-livre.com/image.jpg',
            favori: false,

        });

        // Vérification que l'événement retourné correspond bien à l'événement de test
        const response = await httpRequester
            .get('/events/123456')
            .expect(200);

        expect(response.body).toEqual({
            objectid: 123456,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
            cat0: 'Culture',
            cat1: 'Salon',
            cat2: 'Livre',
            cat3: 'Littérature',
            cat4: 'Rencontres',
            cat5: 'Auteurs',
            adresse_postal: 'Palais des Congrès, Marseille',
            code_postal: '13008',
            commune: 'Marseille',
            telephone: '0491000000',
            email: 'contact@salon-livre.com',
            site_web: 'http://salon-livre.com',
            latitude: 43.2705,
            longitude: 5.3955,
            lien_media: 'http://salon-livre.com/image.jpg',
            favori: false,

        });
    });

    it('POST /events/favoris/:objectid & GET /events/favoris', async () => {
        // First prepare the data by adding some books
        await httpRequester.post('/events').send({
            objectid: 123456,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
            cat0: 'Culture',
            cat1: 'Salon',
            cat2: 'Livre',
            cat3: 'Littérature',
            cat4: 'Rencontres',
            cat5: 'Auteurs',
            adresse_postal: 'Palais des Congrès, Marseille',
            code_postal: '13008',
            commune: 'Marseille',
            telephone: '0491000000',
            email: 'contact@salon-livre.com',
            site_web: 'http://salon-livre.com',
            latitude: 43.2705,
            longitude: 5.3955,
            lien_media: 'http://salon-livre.com/image.jpg',
            favori: false,
        });

        // Ajout aux favoris
        await httpRequester.post(`/events/favoris/123456`).expect(201);

        // Vérification de l'obtention de la liste de favoris
        const response = await httpRequester
            .get('/events/favoris')
            .expect(200);

        expect(response.body).toEqual([{
            objectid: 123456,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
        }]);
    });

    it('GET /events/loc/:code', async () => {
        await httpRequester.post('/events').send(
            {
                objectid: 123456,
                nom_poi: 'Salon du Livre',
                description: 'Un salon du livre avec de nombreux auteurs invités.',
                url_poi: 'http://salon-livre.com',
                cat0: 'Culture',
                cat1: 'Salon',
                cat2: 'Livre',
                cat3: 'Littérature',
                cat4: 'Rencontres',
                cat5: 'Auteurs',
                adresse_postal: 'Palais des Congrès, Marseille',
                code_postal: '80000',//code postal en dehors de la région
                commune: 'Marseille',
                telephone: '0491000000',
                email: 'contact@salon-livre.com',
                site_web: 'http://salon-livre.com',
                latitude: 43.2705,
                longitude: 5.3955,
                lien_media: 'http://salon-livre.com/image.jpg',
                favori: false,
            }
        );

        const response = await httpRequester.get('/events/loc/80000').expect(200);

        expect(response.body).toEqual([
            {
                objectid: 123456,
                nom_poi: 'Salon du Livre',
                description: 'Un salon du livre avec de nombreux auteurs invités.',
                url_poi: 'http://salon-livre.com',
                code_postal: '80000',
                favori: false,
            }
        ]);
    });

    it('GET /events/autourde?lat&lon&rayon', async () => {

        await httpRequester.post('/events').send({
            objectid: 123456,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
            cat0: 'Culture',
            cat1: 'Salon',
            cat2: 'Livre',
            cat3: 'Littérature',
            cat4: 'Rencontres',
            cat5: 'Auteurs',
            adresse_postal: 'Palais des Congrès, Marseille',
            code_postal: '13000',
            commune: 'Marseille',
            telephone: '0491000000',
            email: 'contact@salon-livre.com',
            site_web: 'http://salon-livre.com',
            latitude: 70.05,
            longitude: 1,
            lien_media: 'http://salon-livre.com/image.jpg',
            favori: false,}
        );

        const response = await httpRequester
            .get('/events/autourde?lat=70.05&lon=1&rayon=5') // 5 km de rayon
            .expect(200);

        expect(response.body).toEqual(
            [{
                objectid: 123456,
                nom_poi: 'Salon du Livre',
                description: 'Un salon du livre avec de nombreux auteurs invités.',
                url_poi: 'http://salon-livre.com',
                latitude: 70.05,
                longitude: 1,
                favori: false,
            }]
        );
    });
    it('DELETE /events/:objectid', async () => {
        // First prepare the data by adding a book
        await httpRequester.post('/events').send({
            objectid: 123458,
            nom_poi: 'Salon du Livre',
            description: 'Un salon du livre avec de nombreux auteurs invités.',
            url_poi: 'http://salon-livre.com',
            cat0: 'Culture',
            cat1: 'Salon',
            cat2: 'Livre',
            cat3: 'Littérature',
            cat4: 'Rencontres',
            cat5: 'Auteurs',
            adresse_postal: 'Palais des Congrès, Marseille',
            code_postal: '13000',
            commune: 'Marseille',
            telephone: '0491000000',
            email: 'contact@salon-livre.com',
            site_web: 'http://salon-livre.com',
            latitude: 70.05,
            longitude: 1,
            lien_media: 'http://salon-livre.com/image.jpg',
            favori: false,});

        // suppression de l'event
        await httpRequester.delete('/events/123458').expect(200);

        // Test que l'event est bien supprimé
        const response = await httpRequester.get('/events');

        expect(
            response.body.some((event) => event.objectid === 123456),
        ).toBeFalsy();
    });
});
