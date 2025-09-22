import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode } from '@nestjs/common';
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

@Get(':categorie')
getTotalNumberOfEventsByCat(@Query('categorie') categorie?: string): Partial<Event>[]
{
  if(categorie)
  {
    return this.eventService.getTotalNumberOfEventsByCat(categorie);
  }
  return this.eventService.getAllEvents();
}
@Post('search')
@HttpCode(200)
  searchEvent(@Body() { term }: { term: string }): Event[] {
    return this.eventService.search(term);
  }
}
