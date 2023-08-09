import { createAction, props } from '@ngrx/store';
import { Product, ShoppingCartItem } from './cart.reducer';

export const getAllProducts = createAction(
  '[Cart] Get all products'
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product}>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ id: number; qty: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: number }>()
);

export const reset = createAction(
  '[Cart] Reset Cart',
);