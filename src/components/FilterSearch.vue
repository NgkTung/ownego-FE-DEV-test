<template>
  <Panel
    header="Filter search by toppings"
    class="mx-4"
    toggleable
    collapsed="false"
  >
    <button
      v-for="topping in toppings"
      :key="topping"
      class="topping-btn mb-2 mr-2"
      :class="{ selected: filterSelectedToppings.includes(topping) }"
      @click="useGlobalStore().toggleFilterTopping(topping)"
    >
      {{ topping }}
    </button>
  </Panel>
</template>

<script setup lang="ts">
import Panel from "primevue/panel";

import data from "../data/mockMenuData.json";
import { ref } from "vue";
import { useGlobalStore } from "../stores/global";
import { storeToRefs } from "pinia";

const toppings = ref(data.toppings);
const { filterSelectedToppings } = storeToRefs(useGlobalStore());
</script>
