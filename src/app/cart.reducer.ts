import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { getAllProducts, addToCart, updateQuantity, removeFromCart, reset } from './cart.actions';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
}

// One product in shopping cart
export interface ShoppingCartItem {
  product: Product,
  quantity: number
}


// initial shopping cart state - we use this for the state only
export const initialState: ShoppingCartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  // on(getAllProducts, () => resetState()),
  on(addToCart, (state, { product }) => {
    const existingItem = state.find(item => item.product.id === product.id);

    if (existingItem) {
      // If the product already exists in the cart, update the quantity
      return state.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      const newItem: ShoppingCartItem = {
        product,
        quantity: 1 // Initial quantity for new items
      };
      return [...state, newItem];
    }
  }),
  on(removeFromCart, (state, {id}) => {
    const filteredResult = state.filter(item => item.product.id !== id)
    return [...filteredResult]
  }),
  on(updateQuantity, (state, {id, qty}) => {
    const updatedItems = state.map(item => {
      if (item.product.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    })
    return [...updatedItems];
  }),
  on(reset, () => resetState())
)


const resetState = () => {
  return initialState
}

export const selectCartState = createFeatureSelector<ShoppingCartItem[]>('cart'); // THIS IS A MUST

