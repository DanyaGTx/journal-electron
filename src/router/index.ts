import { createWebHistory, createRouter } from "vue-router";

import AllNotes from "@/views/AllNotes.vue";
import LoginPage from "@/views/LoginPage.vue";
import NoteDetails from "@/components/Notes/NoteDetails.vue";

const routes = [
  {
    path: "/notes",
    alias: "/",
    name: "notes",
    component: AllNotes,
    children: [{ path: "/notes/:id", component: NoteDetails }],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
