import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { Express } from 'express'
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Get('get')
    bookmarkGet(
        @GetUser() user: User
    ) {
        return this.bookmarkService.bookmarkGet()
    }

    @UseGuards(JwtGuard)
    @ApiCreatedResponse({ description: 'Book data post' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string'  },
                description: { type: 'string' },
                file: {
                   type: 'string',
                   format: 'binary'
                }
            }
        }
    })
    // @ApiImplicitFormData({ name: 'file', required: true })
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    @Post('post')
    bookmarkPost(
        @GetUser() user: User,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: BookmarkDto,
    ): Promise<any> {
        return this.bookmarkService.bookmarkPost(dto, file, user)
    }

    @UseGuards(JwtGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
               title: { type: 'string' },
               description: { type: 'string' },
               file: {
                   type: 'string',
                   format: 'binary'
               } 
            }
        }
    })
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    @Put('put/:id')
    bookmarkPut(
        @GetUser() user: User,
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: BookmarkDto,
        ) {
        return this.bookmarkService.bookmarkPut(id, dto, file, user)
    }

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Delete('delete/:id')
    bookmarkDelete(
        @GetUser() user: User,
        @Param('id') id: string) {
        return this.bookmarkService.bookmarkDelete(id)
    }


}
