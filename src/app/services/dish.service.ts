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

  getDish(id: string) {
    return DISHES.filter(dish => dish.id === id)[0];
  }

  getFeaturedDish() {
    return DISHES.filter(dish => dish.featured)[0];
  }
}
