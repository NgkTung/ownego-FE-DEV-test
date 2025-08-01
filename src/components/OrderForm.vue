<template>
  <Dialog
    v-model:visible="isModalOpen"
    modal
    :draggable="false"
    :style="{ width: '600px' }"
  >
    <template #header>
      <h2 class="text-2xl"></h2>
    </template>
    <div>
      <div class="order-form-content">
        <img :src="selectedProduct?.image" :alt="selectedProduct?.name" />

        <p class="product-name">{{ selectedProduct?.name }}</p>
        <!-- <p class="product-price">${{ selectedProduct?.price.toFixed(2) }}</p> -->

        <div>
          <p class="mb-5 text-md">Select your toppings:</p>
          <div class="select-toppings">
            <button
              v-for="(topping, index) in selectedProduct?.toppings"
              :key="index"
              class="topping-btn"
              :class="{ selected: selectedTopping === topping }"
              @click="selectedTopping = topping"
            >
              {{ topping }}
            </button>
          </div>
        </div>

        <div>
          <div class="quantity-selector flex items-center gap-2">
            <button
              class="p-1 border rounded cursor-pointer disabled:border-gray-300 disabled:text-gray-300"
              @click="handleDecrease"
              :disabled="quantity == 1"
            >
              <Minus />
            </button>
            <span class="qty-value px-3">{{ quantity }}</span>
            <button class="p-1 border rounded" @click="handleIncrease">
              <Plus />
            </button>
          </div>
        </div>

        <div>
          <p class="font-lora text-xl mb-5">
            Total price: ${{ totalPrice.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="button-container">
        <button @click="handleAddToCart" class="btn-add">
          <ShoppingCart class="w-4 h-4 inline-block mr-3" />
          Add to Cart
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import { ShoppingCart } from "lucide-vue-next";
import { useGlobalStore } from "../stores/global";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { v4 } from "uuid";

import { Minus, Plus } from "lucide-vue-next";

import { ref, watch } from "vue";
import type { CartItem } from "../types";

const globalStore = useGlobalStore();
const cartStore = useCartStore();
const { isModalOpen, selectedProduct } = storeToRefs(globalStore);
const { addToCart } = cartStore;

const quantity = ref(1);
const selectedTopping = ref("");
const totalPrice = ref(selectedProduct?.value?.price || 0);

watch(selectedProduct, (newProduct) => {
  if (newProduct) {
    quantity.value = 1;
    selectedTopping.value = "";
    totalPrice.value = newProduct.price;
  }
});

const handleIncrease = () => {
  quantity.value++;
  totalPrice.value += selectedProduct.value?.price || 0;
};

const handleDecrease = () => {
  if (quantity.value > 1) {
    quantity.value--;
    totalPrice.value -= selectedProduct.value?.price || 0;
  }
};

const handleAddToCart = () => {
  if (selectedTopping.value === null) {
    alert("Please choose one topping");
    return;
  }
  if (selectedProduct === null) return;

  const newCartItem: CartItem = {
    cartId: v4(),
    product: { ...selectedProduct.value },
    quantity: quantity.value,
    topping: selectedTopping.value,
    totalPrice: totalPrice.value,
  };

  addToCart(newCartItem);
  globalStore.toggleModal();
  globalStore.openConfirmModal();

  quantity.value = 1;
  selectedTopping.value = "";
  totalPrice.value = selectedProduct?.value?.price || 0;
};
</script>
