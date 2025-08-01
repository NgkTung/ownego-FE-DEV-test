<template>
  <Dialog v-model:visible="isConfirmModalOpen" modal :draggable="false">
    <template #header>
      <h2 class="text-xl">Success</h2>
    </template>
    <p>{{ msgConfirmModal }}</p>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import { useGlobalStore } from "../stores/global";
import { storeToRefs } from "pinia";

const { isConfirmModalOpen, msgConfirmModal } = storeToRefs(useGlobalStore());
</script>
