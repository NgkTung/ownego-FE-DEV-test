<template>
  <p
    v-if="filteredProducts.length === 0"
    class="text-center font-semibold text-gray-500 text-2xl mt-20"
  >
    Oops! No products found for your selection! ( ´〒^〒`)
  </p>
  <div class="product-list">
    <ProductCard
      v-for="product in paginatedProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <Paginator
    v-if="filteredProducts.length > rows"
    :rows="rows"
    :totalRecords="filteredProducts.length"
    :first="currentPage"
    @page="onPageChange"
    class="mt-5 mb-20"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import data from "../data/mockMenuData.json";
import ProductCard from "./ProductCard.vue";
import { useGlobalStore } from "../stores/global";
import { storeToRefs } from "pinia";
import Paginator from "primevue/paginator";
import type { PageState } from "primevue/paginator";

// Props
const props = defineProps<{
  selectedCategory: { id: string } | string;
}>();

// Global store
const { filterSelectedToppings } = storeToRefs(useGlobalStore());

// Pagination state
const rows = 8;
const currentPage = ref(0);

// Filtered products based on category and toppings
const filteredProducts = computed(() => {
  let filtered = data.products;

  // Filter by category
  if (
    typeof props.selectedCategory === "object" &&
    props.selectedCategory.id !== "All"
  ) {
    filtered = filtered.filter(
      (product) => product.categoryId === props.selectedCategory.id
    );
  }

  // Filter by selected toppings
  if (filterSelectedToppings.value.length > 0) {
    filtered = filtered.filter((product) =>
      filterSelectedToppings.value.every((topping) =>
        product.toppings?.includes(topping)
      )
    );
  }

  return filtered;
});

// Paginate visible products
const paginatedProducts = computed(() => {
  const start = currentPage.value;
  const end = start + rows;
  return filteredProducts.value.slice(start, end);
});

// Handle paginator event
function onPageChange(event: PageState) {
  currentPage.value = event.first;
}

// Reset to first page when filters change
watch(
  [() => props.selectedCategory, filterSelectedToppings],
  () => {
    currentPage.value = 0;
  },
  { deep: true }
);
</script>
