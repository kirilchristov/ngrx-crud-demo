import { Injectable } from '@angular/core';
import { Product } from '../cart.reducer';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListingService {
  
  constructor() { }

  getItemsInStore(): Observable<Product[]> {
    return of(demoProductsList);
  }
}




// ---------------------- DEMO DATA
const demoProductsList: Product[] = [
    {
      id: 0,
      name: "Soap",
      price: 3.40,
    },
    {
      id: 1,
      name: "Shampoo",
      price: 2.40,
    },
  ]

