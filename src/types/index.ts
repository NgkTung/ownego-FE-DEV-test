export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  toppings?: string[];
  inventory?: {
    quantity: number;
    status: "in_stock" | "low_of_stock";
  };
}

export interface CartItem {
  product: Product;
  cartId: string;
  quantity: number;
  topping: string;
  totalPrice: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
