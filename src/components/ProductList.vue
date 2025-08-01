<template>
  <p
    v-if="products.length === 0"
    class="text-center font-semibold text-gray-500 text-2xl mt-20"
  >
    Oops! No products found for your selection! ( ´〒^〒`)
  </p>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import data from "../data/mockMenuData.json";
import ProductCard from "./ProductCard.vue";
import { useGlobalStore } from "../stores/global";
import { storeToRefs } from "pinia";

const props = defineProps({
  selectedCategory: {
    type: String,
    required: true,
  },
});

const { filterSelectedToppings } = storeToRefs(useGlobalStore());

const filteredProducts = computed(() => {
  let filtered = data.products;

  // Filter by category if not "All"
  if (props.selectedCategory !== "All") {
    filtered = filtered.filter(
      (product) => product.categoryId === props.selectedCategory.id
    );
  }

  // Filter by toppings
  if (filterSelectedToppings.value.length > 0) {
    filtered = filtered.filter((product) =>
      filterSelectedToppings.value.every((topping) =>
        product.toppings?.includes(topping)
      )
    );
  }

  return filtered;
});

const products = ref(filteredProducts);
</script>
