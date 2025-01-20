import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel:mongoose.Model<Restaurant>
    ){}

    //Get all Restaurants => GET /restaurants
    async findAll(query:Query): Promise<Restaurant[]>{
        
        // we r setting the limit per page to 2
        // we can also change if required
        const resPerPage =2;
        const currentPage =Number(query.page)||1;
        const skipValue = resPerPage*(currentPage-1);


        //if any keyword is present it will return the obj which will send in mongodb query
        const keyword = query.keyword?{
            name:{
                $regex:query.keyword,
                $options:'i'//case insensitive
            }
        }:{};
        //sorting based no restro name
        const restaurants = await this.restaurantModel.find({...keyword}).limit(resPerPage).skip(skipValue).sort({name:1});
        return restaurants;
    }


  

    //create new Restaurrant 
    async create(restaurant:Restaurant): Promise<Restaurant>{
        const res = await this.restaurantModel.create(restaurant);
        return res;
    }

    //Get a restaurant by Id => GET/restaurants/:id
    async findById(id:string): Promise<Restaurant>{
        const restaurant = await this.restaurantModel.findById(id);
        if(!restaurant){
            throw new NotFoundException("Restaurant Not Found");
        }
        return restaurant;
    }

    //Update a restaurant by Id => PUT /restaurants/:id
    async updateById(id:string,restaurant:Restaurant):Promise<Restaurant>{

        return await this.restaurantModel.findByIdAndUpdate(id,restaurant,{
            new:true,
            runValidators:true
        });
    }

    //Delete a restaurant by ID => Delete /restaurants/:id
    async deleteById(id:string):Promise<Restaurant>{
        return await this.restaurantModel.findByIdAndDelete(id);
    }
}
