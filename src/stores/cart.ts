import type { CartItem, Product } from "../types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  // State
  const items = ref<CartItem[]>([]);

  // Getters
  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
  });

  const isEmpty = computed(() => items.value.length === 0);

  const updateItemTotalPrice = (item: CartItem) => {
    item.totalPrice = item.product.price * item.quantity;
  };

  const addToCart = (newCartItem: CartItem) => {
    const existingItem = items.value.find(
      (item) =>
        item.product.id === newCartItem.product.id &&
        item.topping === newCartItem.topping
    );

    if (existingItem) {
      existingItem.quantity += newCartItem.quantity;
      updateItemTotalPrice(existingItem);
    } else {
      items.value.push({
        product: { ...newCartItem.product },
        cartId: newCartItem.cartId,
        topping: newCartItem.topping,
        quantity: newCartItem.quantity,
        totalPrice: newCartItem.totalPrice,
      });
    }
  };

  const removeFromCart = (cartId: string) => {
    console.log(cartId);
    const index = items.value.findIndex((item) => item.cartId === cartId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  //   const updateQuantity = (productId: number, quantity: number) => {
  //     const item = items.value.find((item) => item.id === productId);
  //     if (item) {
  //       if (quantity <= 0) {
  //         removeFromCart(productId);
  //       } else {
  //         item.quantity = quantity;
  //         updateItemTotalPrice(item);
  //       }
  //     }
  //   };

  //   const increaseQuantity = (productId: number) => {
  //     const item = items.value.find((item) => item.id === productId);
  //     if (item) {
  //       item.quantity += 1;
  //       updateItemTotalPrice(item);
  //     }
  //   };

  //   const decreaseQuantity = (productId: number) => {
  //     const item = items.value.find((item) => item.id === productId);
  //     if (item) {
  //       if (item.quantity > 1) {
  //         item.quantity -= 1;
  //         updateItemTotalPrice(item);
  //       } else {
  //         removeFromCart(productId);
  //       }
  //     }
  //   };

  const clearCart = () => {
    items.value = [];
  };

  const getItemQuantity = (productId: number): number => {
    const item = items.value.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    // State
    items,
    // Getters
    cartCount,
    cartTotal,
    isEmpty,
    // Actions
    addToCart,
    removeFromCart,
    // updateQuantity,
    // increaseQuantity,
    // decreaseQuantity,
    clearCart,
    getItemQuantity,
  };
});
