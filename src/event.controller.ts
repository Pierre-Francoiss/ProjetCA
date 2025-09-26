import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './Event';

@Controller('events') // Préfixe pour toutes les routes de ce contrôleur
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  addEvent(@Body() event: Event): string {
    this.eventService.addEvent(event);
    return "Événement ajouté avec succès !";
  }

  @Get('list')
  async listAllEvents(): Promise<Partial<Event>[]> {
    return this.eventService.getAllEvents();
  }

  @Get()
  getEventByCodePostal(@Query('code_postal') code_postal?: number): Partial<Event>[] {
    if (code_postal) {
      return this.eventService.getEventByCodePostal(code_postal);
    }
    return this.eventService.getAllEvents();
  }

  @Get(':objectid')
  getEvent(@Param('objectid') objectid: number): Event | undefined {
    return this.eventService.getEvent(objectid);
  }

  @Delete(':objectid')
  removeEvent(@Param('objectid') objectid: number) {
    this.eventService.removeEvent(objectid);
    return { message: `Événement ${objectid} supprimé avec succès.` };
  }

  @Get('category/:categorie')
  getTotalNumberOfEventsByCat(@Param('categorie') categorie: string): Partial<Event>[] {
    return this.eventService.getTotalNumberOfEventsByCat(categorie);
  }

  @Post('search')
  @HttpCode(200)
  searchEvent(@Body() { term }: { term: string }): Event[] {
    return this.eventService.search(term);
  }
}
