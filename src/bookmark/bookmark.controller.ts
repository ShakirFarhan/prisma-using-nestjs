import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { bookmarkFormData } from './constants';
import { Bookmark } from '@prisma/client';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}
  @Post()
  addBookmark(@Body() body: bookmarkFormData): Promise<Bookmark> {
    return this.bookmark.add(body);
  }
  @Patch('/update/:id')
  updateBookmark(
    @Body() body: bookmarkFormData,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return this.bookmark.update(body, id);
  }

  @Get('/:id')
  getBookmarkById(@Param('id', ParseIntPipe) id: number): Promise<Bookmark> {
    return this.bookmark.getById(id);
  }
  @Delete('/:id')
  deleteBookmark(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.bookmark.deleteById(id);
  }
  @Get()
  getAllBookmarks(): Promise<Bookmark[]> {
    return this.bookmark.getAllBookmars();
  }
}
