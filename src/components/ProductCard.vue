<template>
  <div class="product-card">
    <div
      class="top-0 right-0 absolute text-red-500 cursor-pointer"
      @click="useGlobalStore().toggleAddFavourite(product)"
    >
      <HeartIcon :fill="isFavourite(product) ? 'red' : 'white'" :size="30" />
    </div>
    <img :src="product.image" :alt="product.name" />
    <div class="product-content">
      <p class="product-name">{{ product.name }}</p>
      <p class="product-price mb-2">${{ product.price.toFixed(2) }}</p>
      <div class="product-toppings">
        <div v-for="(topping, index) in product.toppings" :key="index">
          {{ topping }}
        </div>
      </div>
      <div class="button-container">
        <button @click="handleClick" class="btn-add">Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "../stores/global";

import { HeartIcon } from "lucide-vue-next";

import type { Product } from "../types";
import { storeToRefs } from "pinia";

const props = defineProps<{
  product: Product;
}>();

const { toggleModal, setSelectedProduct, setMsgConfirmModal } =
  useGlobalStore();
const { favourites } = storeToRefs(useGlobalStore());

const handleClick = () => {
  setSelectedProduct(props.product);
  toggleModal();
  setMsgConfirmModal("Your item has been added to the cart!");
};

const isFavourite = (product: Product) => {
  return favourites.value.some((fav) => fav.id === product.id);
};
</script>
