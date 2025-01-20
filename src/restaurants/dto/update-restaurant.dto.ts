import { IsEmail, IsEnum, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schemas/restaurant.schema";

export class UpdateRestaurantDto{
    @IsString()
    readonly name:string;
    @IsString()
    readonly description:string;
    @IsEmail()
    readonly email:string;
    @IsPhoneNumber('IN')
    readonly phoneNo:number;
    @IsString()
    readonly address:string;
    @IsEnum(Category,{message:'Please enter the correct category'})
    readonly category:Category;
}