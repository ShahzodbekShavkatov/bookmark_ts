import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async userGet() {
        try {
            return await this.prisma.user.findMany()

        } catch(error) {
            return error
        }
    }

    async userDelete(id) {
        try {
            return this.prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })

        } catch(error) {
            return error
        }
    }
}