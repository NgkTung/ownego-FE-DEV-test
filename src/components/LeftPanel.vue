<template>
  <div class="left-panel">
    <h1 class="text-4xl text-center font-bold py-12 font-mogra">
      Milk Tea Store
    </h1>
    <ul class="category-list">
      <li
        class="category-item"
        :class="{ selected: activeCategory === 'All' }"
        @click="selectCategory('All')"
      >
        All
      </li>
      <li
        v-for="(category, index) in categories"
        :key="index"
        :class="activeCategory === category ? 'selected' : ''"
        @click="selectCategory(category)"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import data from "../data/mockMenuData.json";

const categories = ref(data.categories || []);
const activeCategory = ref("All");

// Define the emit
const emit = defineEmits<{
  categoryChanged: [category: string];
}>();

const selectCategory = (category: string) => {
  activeCategory.value = category === "All" ? "All" : category;
  // Emit the selected category to parent
  emit("categoryChanged", activeCategory.value);
};
</script>
