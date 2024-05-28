<script setup lang="ts">
import { mdiHomeCity, mdiAccount, mdiAccountGroupOutline, mdiLogout } from "@mdi/js";
import { useUserStore } from "@/stores/user";
import { logoutUserApi } from "@/database/services/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();

const redirectTo = (page: string) => {
  switch (page) {
    case "notes":
      router.push({ name: "notes" });
      break;
    case "home":
      router.push({ name: "home" });
      break;
    case "users":
      router.push({ name: "users" });
      break;
  }
};

const logout = async () => {
  try {
    await logoutUserApi();
    userStore.userData = null;
    await router.push({ name: "login" });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer location="left" permanent>
        <template v-slot:prepend>
          <div style="display: flex; justify-content: space-between">
            <v-list-item
              lines="two"
              prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
              subtitle="Logged in"
              :title="userStore.getUserName"
            >
            </v-list-item>
            <v-list-item @click="logout">
              <v-icon :icon="mdiLogout"></v-icon>
            </v-list-item>
          </div>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="redirectTo('notes')" :prepend-icon="mdiAccount" title="Notes" value="account" />
          <v-list-item @click="redirectTo('home')" :prepend-icon="mdiHomeCity" title="Home" value="home"></v-list-item>
          <v-list-item
            @click="redirectTo('users')"
            :prepend-icon="mdiAccountGroupOutline"
            title="Users"
            value="users"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
