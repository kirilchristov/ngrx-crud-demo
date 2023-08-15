import { Component } from '@angular/core';
import { Product, ShoppingCartItem, selectCartState } from '../cart.reducer';
import { ProductListingService } from './product-listing.service';
import { Store } from '@ngrx/store';
import { addToCart, removeFromCart, updateQuantity } from '../cart.actions';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  constructor(
    private productListingService: ProductListingService,
    private store: Store
  ) {}

  productsInStore: Product[] = [];
  cart: ShoppingCartItem[] = [];

  ngOnInit() {
    this.productListingService
      .getItemsInStore()
      .subscribe((items) => (this.productsInStore = items));

    this.store
      .select(selectCartState)
      .subscribe((cartState: ShoppingCartItem[]) => {
        this.cart = cartState;
      });
  }

  public addItemToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }

  public removeFromCart(id: number) {
    this.store.dispatch(removeFromCart({id}))
  }

  public update(id: number, qty: number) {
    this.store.dispatch(updateQuantity({ id, qty }));
  }
}
