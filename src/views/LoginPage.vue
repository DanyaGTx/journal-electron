<template>
  <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px">
    <v-btn @click="pageType = 'login'">Login</v-btn>
    <v-btn @click="pageType = 'signup'">Signup</v-btn>
  </div>
  <div class="container">
    <form v-if="pageType === 'signup'" class="login-form" @submit.prevent="submit">
      <h2 class="login-form__title">SignUp</h2>
      <v-text-field
        v-model="name.value.value"
        :counter="20"
        :error-messages="name.errorMessage.value"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        label="Password"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        label="Remember me"
        type="checkbox"
        value="1"
      ></v-checkbox>

      <v-btn class="me-4" type="submit"> submit </v-btn>

      <v-btn @click="handleReset"> clear </v-btn>
    </form>

    <form v-if="pageType === 'login'" class="login-form" @submit.prevent="submit">
      <h2 class="login-form__title">Login!</h2>
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        label="Password"
      ></v-text-field>

      <v-btn class="me-4" type="submit"> submit </v-btn>

      <v-btn @click="handleReset"> clear </v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useUserStore } from "@/stores/user";
import { createUserApi, loginUserApi, getUserApi } from "@/database/services/user";
import type { IUserInfo, IUserLoginInfo } from "@/types/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const pageType = ref("login");

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if ((value?.length >= 2 && value?.length <= 20) || pageType.value === "login") return true;

      return "Name needs to be at from 2 to 20 characters.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    checkbox(value: string) {
      if (value === "1" || pageType.value === "login") return true;

      return "Must be checked.";
    },
  },
});
const name = useField<string>("name");
const email = useField<string>("email");
const password = useField<string>("password");
const checkbox = useField("checkbox");

const createUser = async (userInfo: IUserInfo) => {
  try {
    const response = await createUserApi(userInfo);
    console.log("register reponse", response);
    if (response) {
      userStore.userData = response;
    }

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const loginUser = async (userLoginInfo: IUserLoginInfo) => {
  try {
    await loginUserApi(userLoginInfo);

    const response = await getUserApi();
    if (response) {
      console.log("login reponse", response);
      // add TS type for login user response
      userStore.userData = response as any;
    }

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const submit = handleSubmit(async (values) => {
  if (pageType.value === "signup") {
    const newUser = {
      userId: crypto.randomUUID(),
      email: email.value.value,
      password: password.value.value,
      name: name.value.value,
    };

    try {
      const response = await createUser(newUser);
      if (response) {
        router.push({ name: "notes" });
      }
    } catch (e) {
      console.error(e);
    }
  } else if (pageType.value === "login") {
    const loginUserData = {
      email: email.value.value,
      password: password.value.value,
    };

    try {
      const response = await loginUser(loginUserData);
      if (response) {
        router.push({ name: "notes" });
      }
    } catch (e) {
      console.error(e);
    }
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-form {
  max-width: 800px;
  width: 100%;
}

.login-form__title {
  text-align: center;
  margin-bottom: 50px;
}
</style>
