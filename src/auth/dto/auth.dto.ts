import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class Authdto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'firstname' })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'lastname' })
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'email' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'password' })
    password: string;
}