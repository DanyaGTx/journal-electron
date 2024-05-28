<script setup lang="ts">
import { watch, ref } from "vue";
import type { INote } from "@/components/Notes/types/index";

const props = defineProps<{
  currentNoteInfo: INote;
}>();

const emit = defineEmits<{
  (e: "add-note", text: string, id: string): void;
}>();

const noteTextInput = ref("");

const addNoteDetails = () => {
  emit("add-note", noteTextInput.value, props.currentNoteInfo.$id);
};

watch(
  () => props.currentNoteInfo,
  (currentNoteInfo) => {
    noteTextInput.value = currentNoteInfo.description as string;
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="note__details">
    <div>
      <div class="note__details-header">
        <div class="note__details-header-banner">
          <h2 class="note__details-title">{{ props.currentNoteInfo?.name }}</h2>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <p class="note__details-title">{{ props.currentNoteInfo?.description }}</p>
      <textarea class="note__textarea" v-model="noteTextInput" label="Label" no-resize></textarea>
      <div class="note_buttons">
        <v-btn @click="noteTextInput = ''" class="save__note">Clear</v-btn>
        <v-btn @click="addNoteDetails" class="save__note">Save</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.note__details {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 10px 10px;
  position: relative;

  &-title {
    position: absolute;
    bottom: 10%;
    right: 10%;
    color: white;
    font-size: 50px;
  }

  &-header {
    display: flex;
    justify-content: right;

    &-banner {
      height: 170px;
      width: 100%;
      background-color: black;
      border-radius: 20px 0px 0px 0px;
      position: relative;
    }
  }

  &-text {
    margin-top: 30px;
    font-size: 22px;
  }
}

.note__textarea {
  min-height: 50vh;
  width: 100%;
  font-size: 22px;
  outline: none;
  resize: none;
}

:deep(.v-input__details) {
  display: none !important;
}

.note_buttons {
  display: flex;
  justify-content: right;
  gap: 10px;
  margin-top: 10px;
}
</style>
