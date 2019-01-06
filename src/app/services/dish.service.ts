import { DISHES } from './../shared/dishes';
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor() {}
  getDishes(): Dish[] {
    return DISHES;
  }
}
