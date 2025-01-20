import { Controller,Get,Post,Body, Param,Patch, Delete, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {Query as ExpressQuery} from 'express-serve-static-core';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsServices:RestaurantsService){}

    // Here ExpressQuery is used for typesafety
    @Get()
    async getAllRestaurants(@Query() query:ExpressQuery): Promise<Restaurant[]>{
        return this.restaurantsServices.findAll(query);
    }

    @Post()
    async createRestaurant(@Body() restaurant:CreateRestaurantDto):Promise<Restaurant>{
        return this.restaurantsServices.create(restaurant);
    }

    @Get(':id')
    async getRestaurant(@Param('id') id:string):Promise<Restaurant>{
        // console.log('inside controller')
        return this.restaurantsServices.findById(id);
    }

    @Patch(':id')
    async updateRestaurant(@Param('id') id:string,@Body() restaurant:UpdateRestaurantDto):Promise<Restaurant>{
        //to check whether id is present or not
        await this.restaurantsServices.findById(id);
        return this.restaurantsServices.updateById(id,restaurant);
    }

    @Delete(':id')
    async deleteRestaurant(@Param('id') id:string):Promise<{deleted:Boolean}>{
        await this.restaurantsServices.findById(id);
        
        const restaurant =this.restaurantsServices.deleteById(id);
        if(restaurant){
            return {deleted:true}
        }
    }
}
