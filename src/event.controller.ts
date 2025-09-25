import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import type { Event } from './Event';
import { EventService } from './event.service';

@Controller('/events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    createEvent(@Body() event: Event): Event {
        this.eventService.addEvent(event);
        return this.eventService.getEvent(event.objectid);
    }

    @Get()
    getAllEvents(): Partial<Event>[] {
        return this.eventService.getAllEvents();
    }

    @Get('favoris')
    getFavs() {
        return this.eventService.getFavs();
    }


    @Post('favoris/:objectid')
    addFav(@Param('objectid') objectid: number) {
        this.eventService.setFav(Number(objectid), true);
        return { success: true };
    }

    @Post('exfavoris/:objectid')
    removeFav(@Param('objectid') objectid: number) {
        this.eventService.setFav(Number(objectid), false);
        return { success: true };
    }

    @Get('loc/:code')
    getByPostalCode(@Param('code') code: string) {
        return this.eventService.getByPostalCode(code);
    }

    @Get('autourde')
    getNearbyEvents(
        @Query('lat') lat: string,
        @Query('lon') lon: string,
        @Query('rayon') rayon: string,
    ) {
        return this.eventService.getByLocation(Number(lat), Number(lon), Number(rayon));
    }

    //mis en dernier pour ne pas poser de problème de priorité
    @Get(':objectid')
    getEvent(@Param('objectid') objectid: string): Event {
        return this.eventService.getEvent(Number(objectid));
    }
}
