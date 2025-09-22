import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './Event';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

@Post('books')
addEvent(@Body() event:Event):string
{
    this.eventService.addEvent(event);
    return "Evènement ajouté avec succès !"

}

@Get()
getEventByCodePostal(@Query('code_postal') code_postal?: number): Partial<Event>[] {
    if (code_postal)
    {
      return this.eventService.getEventByCodePostal(code_postal);
    }
    return this.eventService.getAllEvents();
  }

@Get(':objectid')
getEvent(@Param('objectid') objectid: number):Event | undefined
{
    return this.eventService.getEvent(objectid);
}


@Delete(':objectid')
removeEvent(@Param('objectid') objectid: number)
{
    return this.eventService.removeEvent(objectid);
}
}
