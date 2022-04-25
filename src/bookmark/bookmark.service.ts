import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { join } from "path";
import { PrismaService } from "src/prisma/prisma.service";
import { BookmarkDto } from "./dto";
import { writeFileSync } from "fs"

@Injectable()
export class BookmarkService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async bookmarkGet() {
        try {
            return await this.prisma.bookmark.findMany()
        } catch(error) {
            return error
        }
    }

    async bookmarkPost(dto: BookmarkDto, file: Express.Multer.File, user: User) {
        try {
            const filePath = join(process.cwd(), 'files', file.originalname)
            writeFileSync(filePath, file.buffer)

            const bookmark = await this.prisma.bookmark.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    link: file.originalname,
                    userId: user.id,
                },
            });
            return bookmark

        } catch(error) {
            return error
        }
    }

    async bookmarkPut(id, dto: BookmarkDto, file: Express.Multer.File, user: User) {
        try {
            const postData = await this.prisma.bookmark.findUnique({
                where: { id: Number(id) }
            })

            const filePath = join(process.cwd(), 'files', file.originalname)
            writeFileSync(filePath, file.buffer)

            return this.prisma.bookmark.update({
                where: { id: Number(id) || undefined },
                data: { 
                    title: dto.title,
                    description: dto.description,
                    link: file.originalname,
                    userId: user.id,
                },
            })

        } catch(error) {
            return error
        }
    }

    async bookmarkDelete(id) {
        try {
            return this.prisma.bookmark.delete({ where: { id: Number(id) } })

        } catch(error) {
            return error
        }
    }
}