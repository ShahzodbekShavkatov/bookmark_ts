import { Controller, Get, UseGuards, Req, Patch, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Get('me')
    getMe(
        @GetUser() user: User,
    ) {
        return user;
    }

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Get('all')
    userAll(
        @GetUser() user: User,
    ) {
        return this.userService.userGet()
    }

    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @Delete('delete/:id')
    userDelete(
        @GetUser() user: User,
        @Param('id') id: string) {
        return this.userService.userDelete(id)
    }

}
