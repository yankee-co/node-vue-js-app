<template>
    <div class="container my-auto py-5" style="max-width: max-content; min-width: 30%">
        <p class="fs-3 text-center fw-bold">Вхід</p>
        <form id="loginForm" @submit.prevent="loginUser">
            <div class="mb-3">
                <label class="form-label" for="inputEmail">Пошта</label>
                <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Пошта" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="inputPassword">Пароль</label>
                <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Пароль" required>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkRemember">
                    <label class="form-check-label" for="checkRemember">Запам'ятати мене</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" id="loginButton">Увійти</button>
        </form>
        <div class="container w-100 mt-5 text-center">
            <router-link class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/register">Не маю акаунту</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.email,
          password: this.password,
        });

        // Зберігаємо токен в localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userEmail', response.data.email);
        this.$router.push('/dashboard'); // Перехід на сторінку після входу
      } catch (error) {
        console.error('Login error', error);
        alert('Невірна пошта чи пароль');
      }
    },
  },
};
</script>
