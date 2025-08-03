<template>
  <div class="main">
    <LeftPanel @category-changed="handleCategoryChange" />
    <div class="w-3/4 max-w-[1200px] mx-auto my-10">
      <h1 class="text-3xl font-bold my-4 text-center">
        {{ selectedCategory === "All" ? "All" : selectedCategory.name }} Menu
      </h1>

      <FilterSearch />

      <ProductList :selectedCategory="selectedCategory" />
    </div>

    <!-- FAVOURITE DRINKS -->
    <Favourites v-model:favouritesVisible="favouritesVisible" />

    <!-- CART -->
    <Cart v-model:cartVisible="cartVisible" />

    <OrderForm />

    <!-- Confirm Modal -->
    <ConfirmModal />

    <div class="fixed top-0 right-0 p-10 flex gap-4 z-50">
      <Button
        icon="pi pi-heart"
        @click="favouritesVisible = true"
        raised
        rounded
        severity="danger"
      ></Button>
      <Button
        icon="pi pi-shopping-cart"
        @click="cartVisible = true"
        raised
        rounded
        severity="contrast"
      ></Button>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref } from "vue";
import LeftPanel from "./components/LeftPanel.vue";
import ProductList from "./components/ProductList.vue";
import Cart from "./components/Cart.vue";
import Favourites from "./components/Favourites.vue";
import OrderForm from "./components/OrderForm.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
import FilterSearch from "./components/FilterSearch.vue";
import Footer from "./components/Footer.vue";

import Button from "primevue/button";

const selectedCategory = ref("All");

const handleCategoryChange = (category: string | Object) => {
  selectedCategory.value = category;
};

const favouritesVisible = ref(false);
const cartVisible = ref(false);
</script>
