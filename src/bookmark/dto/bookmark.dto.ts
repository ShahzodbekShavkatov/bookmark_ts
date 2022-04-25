import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class BookmarkDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Book title' })
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Book description' })
    description: string

}