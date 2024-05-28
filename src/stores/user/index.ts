import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { IUserInfoApi } from "@/types/user";

export const useUserStore = defineStore("counter", () => {
  const userData = ref<IUserInfoApi | null>(null);

  const getUserName = computed(() => {
    return userData.value?.name;
  });

  return { userData, getUserName };
});
