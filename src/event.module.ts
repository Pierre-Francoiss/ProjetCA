import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './event.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
