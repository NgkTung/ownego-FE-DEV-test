import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../types/index";

export const useGlobalStore = defineStore("global", () => {
  // State
  const isDarkMode = ref(false);
  const isModalOpen = ref(false);
  const selectedProduct = ref<Product | null>(null);
  const isConfirmModalOpen = ref(false);

  const msgConfirmModal = ref("");

  const filterSelectedToppings = ref<string[]>([]);
  const favourites = ref<Product[]>([]);

  // Actions
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const setSelectedProduct = (product: Product | null) => {
    selectedProduct.value = product;
  };

  const openConfirmModal = () => {
    isConfirmModalOpen.value = true;
    setTimeout(() => {
      isConfirmModalOpen.value = false;
    }, 2000); // 2000ms = 2 seconds
  };

  const toggleFilterTopping = (newTopping: string) => {
    const index = filterSelectedToppings.value.indexOf(newTopping);
    if (index === -1) {
      filterSelectedToppings.value.push(newTopping);
    } else {
      filterSelectedToppings.value.splice(index, 1);
    }
  };

  const toggleAddFavourite = (product: Product) => {
    const index = favourites.value.findIndex((fav) => fav.id === product.id);

    if (index !== -1) {
      favourites.value.splice(index, 1);
    } else {
      favourites.value.push(product);
    }
  };

  const clearFavourites = () => {
    favourites.value = [];
  };

  const setMsgConfirmModal = (msg: string) => {
    msgConfirmModal.value = msg;
  };

  return {
    //GETTERS
    isDarkMode,
    isModalOpen,
    selectedProduct,
    isConfirmModalOpen,
    filterSelectedToppings,
    favourites,
    msgConfirmModal,

    //SETTERS and ACTIONS
    toggleDarkMode,
    toggleModal,
    setSelectedProduct,
    openConfirmModal,
    toggleFilterTopping,
    toggleAddFavourite,
    clearFavourites,
    setMsgConfirmModal,
  };
});
