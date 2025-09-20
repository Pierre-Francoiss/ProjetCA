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
        return this.eventService.getEvent(event.OBJECTID);
    }

    @Get()
    getAllEvents(): Event[] {
        return this.eventService.getAllEvents();
    }



    @Get(':OBJECTID')
    getEvent(@Param('OBJECTID') OBJECTID: number): Event {
        return this.eventService.getEvent(OBJECTID);
    }


}
