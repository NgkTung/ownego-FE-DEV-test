<template>
  <Drawer
    :visible="props.favouritesVisible"
    position="right"
    @update:visible="emit('update:favouritesVisible', $event)"
  >
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Favourite Drinks</h2>
      <p v-if="favourites.length === 0">
        Oops! You have no favourite product. Let's start to find you one!
        (つ≧▽≦)つ
      </p>
      <div v-else class="flex flex-col gap-y-10">
        <div v-for="product in favourites" class="relative">
          <div
            class="top-0 right-0 absolute text-red-500 cursor-pointer"
            @click="useGlobalStore().toggleAddFavourite(product)"
          >
            <XCircleIcon size="30" />
          </div>
          <div class="flex flex-col rounded-lg shadow-lg">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-56 object-cover mb-2 flex-shrink-0"
            />
            <div class="p-4">
              <p class="text-lg font-bold mb-2">
                {{ product.name }}
              </p>
            </div>
          </div>
        </div>
        <button class="btn-clear" @click="useGlobalStore().clearFavourites()">
          Clear favourites
        </button>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from "primevue/drawer";
import { useGlobalStore } from "../stores/global";
import { storeToRefs } from "pinia";

const { favourites } = storeToRefs(useGlobalStore());

import { XCircleIcon } from "lucide-vue-next";

const props = defineProps({
  favouritesVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:favouritesVisible"]);
</script>
