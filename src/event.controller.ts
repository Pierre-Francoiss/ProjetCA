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

    @Get('favorits')
    getFavs() {
        return this.eventService.getFavs();
    }

    @Get(':objectid')
    getEvent(@Param('objectid') objectid: string): Event {
        return this.eventService.getEvent(Number(objectid));
    }



    @Post('favorits/:objectid')
    addFav(@Param('objectid') objectid: number) {
        this.eventService.setFav(Number(objectid), true);
        return { success: true };
    }

    @Post('exfavorits/:objectid')
    removeFav(@Param('objectid') objectid: number) {
        this.eventService.setFav(Number(objectid), false);
        return { success: true };
    }
}
