<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import CreateNote from "@/components/Notes/CreateNote.vue";
import type { INote } from "@/components/Notes/types/index";
import { RouterView, useRouter } from "vue-router";
import { mdiDelete } from "@mdi/js";
import { createNote, getAllNotes, getExactNoteDetails, deleteNote, updateNote } from "@/database/services/notes";
import NavigationBar from "@/components/NavigationBar.vue";

const entryMessage = ref("");
const allNotes = ref<INote[]>([]);
const currentNoteInfo = ref<INote | {}>({});
const currentNote = computed(() => router.currentRoute.value.params.id);

const router = useRouter();

const isNoteExisted = (name: string) => {
  return allNotes.value.some((item) => item.name === name);
};

const handleCreateNote = async () => {
  if (isNoteExisted(entryMessage.value)) {
    alert("This note already existed");
    entryMessage.value = "";
    return;
  }

  try {
    const response = await createNote(entryMessage.value);
    currentNoteInfo.value = response;
    await fetchAllNotes();
    router.push(`/notes/${response.name}`);
    entryMessage.value = "";
  } catch (e) {
    console.error(e);
  }
};

const handleSelectNote = async (note: INote) => {
  try {
    currentNoteInfo.value = await getExactNoteDetails(note.$databaseId, note.$collectionId, note.$id);
    router.push(`/notes/${note.name}`);
  } catch (error) {
    console.error("Error selecting note:", error);
  }
};

const handleDeleteNote = async (noteId: string) => {
  try {
    await deleteNote(noteId);
    await fetchAllNotes();
    router.push({ name: "notes" });
    currentNoteInfo.value = {};
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

const handleAddNote = async (text: string, id: string) => {
  try {
    await updateNote(id, text);
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

const fetchAllNotes = async () => {
  try {
    allNotes.value = await getAllNotes();
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

onMounted(async () => {
  await fetchAllNotes();
  if (currentNote.value) {
    const note = allNotes.value.find((note) => note.name === currentNote.value) as INote;
    if (note) {
      currentNoteInfo.value = await getExactNoteDetails(note.$databaseId, note.$collectionId, note.$id);
    }
  }
});
</script>

<template>
  <NavigationBar>
    <div class="all-notes">
      <div class="notes">
        <CreateNote @createNote="handleCreateNote" v-model="entryMessage" />
        <div class="notes__cards">
          <template v-for="(note, idx) in allNotes" :key="note.id">
            <div class="notes__card" :class="{ active: note.name === currentNote }" @click="handleSelectNote(note)">
              <div class="notes__card-inner">
                <p>{{ note.name }}</p>

                <v-icon @click.stop="handleDeleteNote(note.$id)" :icon="mdiDelete"></v-icon>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="exact-note">
        <RouterView @add-note="handleAddNote" :currentNoteInfo="currentNoteInfo" />
      </div>
    </div>
  </NavigationBar>
</template>

<style scoped lang="scss">
.all-notes {
  display: flex;
}

.exact-note {
  width: 100%;
}

.notes {
  width: 100%;
  min-height: 100vh;
  border-right: 3px solid #f5f5f5;
  max-width: 500px;

  &__card {
    height: 90px;
    border-top-left-radius: 16px;
    padding: 15px 50px;
    font-weight: 700;
    color: #425bb2;
    font-size: 18px;
    cursor: pointer;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &.active {
      background-color: #f5f5f5;
    }
  }
}
</style>
