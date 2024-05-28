<script setup lang="ts">
import { mdiPlus } from "@mdi/js";
const model = defineModel();

const emit = defineEmits<{
  createNote: [];
}>();

const createNote = () => {
  if (model.value) {
    emit("createNote");
  }
};
</script>

<template>
  <div class="add-entry">
    <input
      v-model="model"
      @keyup.enter="createNote"
      class="add-entry__input"
      type="text"
      placeholder="Create a new note"
    />
    <v-col cols="auto">
      <v-btn @click="createNote" color="#425BB2" :icon="mdiPlus" size="35px"></v-btn>
    </v-col>
  </div>
</template>

<style scoped lang="scss">
.add-entry {
  display: flex;
  align-items: center;
  padding: 10px;

  &__input {
    max-height: 40px;
    border: 2px solid #7388d1;
    border-radius: 36px;
    outline: none;
    padding: 5px 10px;
    width: 100%;
  }
}
</style>
