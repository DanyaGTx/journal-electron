import { getUserApi } from "@/database/services/user";
import { useUserStore } from "@/stores/user";
import router from "./index";

const getUserBeforeRoute = async () => {
  const userStore = useUserStore();

  try {
    if (!userStore.userData) {
      userStore.userData = await getUserApi();
    }

    return userStore.userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

router.beforeEach(async (to, from, next) => {
  const userData = await getUserBeforeRoute();

  if (userData) {
    if (to.name === "login") {
      next({ name: "notes" });
    } else {
      next();
    }
  } else {
    next();
  }
});
