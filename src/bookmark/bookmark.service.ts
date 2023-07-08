import { Inject, Injectable } from '@nestjs/common';
import { bookmarkFormData } from './constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bookmark } from '@prisma/client';
Injectable({});
export class BookmarkService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async add(body: bookmarkFormData): Promise<Bookmark> {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          title: body.title,
          description: body.description,
          link: body.link,
          userId: body.userId,
        },
      });
      return bookmark;
    } catch (error) {
      console.log(error);
    }
  }
  async update(body: bookmarkFormData, id: number): Promise<string> {
    try {
      const bookmark = await this.prisma.bookmark.update({
        where: {
          id: id,
        },
        data: {
          ...body,
        },
      });
      return 'Bookmark Updated';
    } catch (error) {
      console.log(error.message);
    }
  }
  async getById(id: number): Promise<Bookmark> {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id: id,
        },
        include: {
          user: {
            select: {
              email: true,
              id: true,
              createdAt: true,
              updatedAt: true,
              bookmarks: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });
      return bookmark;
    } catch (error) {
      console.log(error.message);
    }
  }
  async deleteById(id: number): Promise<string> {
    try {
      const deleted = await this.prisma.bookmark.delete({
        where: {
          id: id,
        },
      });
      if (deleted.id) {
        return 'Bookmark Deleted';
      } else {
        return 'No Bookmark with this id';
      }
    } catch (error) {
      return 'Something Went Wrong or Bookmark doesnt exits';
    }
  }
  async getAllBookmars(): Promise<Bookmark[]> {
    try {
      const bookmarks = await this.prisma.bookmark.findMany({
        include: {
          user: {
            select: {
              email: true,
              id: true,
              createdAt: true,
              updatedAt: true,
              bookmarks: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      return bookmarks;
    } catch (error) {
      console.log(error.message);
    }
  }
}
