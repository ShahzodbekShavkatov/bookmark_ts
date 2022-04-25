import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Authdto } from "./dto";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger"

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('signup')
    @ApiCreatedResponse({description: 'User registration'})
    @ApiBody({ type: Authdto })
    signup(@Body() dto: Authdto) {
        return this.authService.signup(dto);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @ApiOkResponse({description: 'User login'})
    @ApiUnauthorizedResponse({description: 'Invalid credentials'})
    @ApiBody({ type: Authdto })
    signin(@Body() dto: Authdto, @Req() req) {
        req.user
        return this.authService.signin(dto)
    }

}