import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
