<template>
    <div class="container my-auto py-5" style="max-width: max-content; min-width: 30%">
        <p class="fs-3 w-100 text-center fw-bold">Реєстрація</p>
        <form id="registerForm" @submit.prevent="registerUser">
            <div class="mb-3">
                <label class="form-label" for="inputEmail">Пошта</label>
                <input type="email" v-model="username" class="form-control" id="inputEmail" placeholder="Пошта" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="inputPassword">Пароль</label>
                <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Пароль" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="inputPasswordAgain">Підтвердіть пароль</label>
                <input type="password" v-model="passwordAgain" class="form-control" id="inputPasswordAgain" placeholder="Введіть пароль ще раз" required>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="form-check form-check-inline">
                        <input type="radio" class="form-check-input" name="gender" id="radioMale" checked>
                        <label class="form-check-label" for="radioMale">Чоловік</label>
                    </div>
                    <div class="form-check form-check-inline ms-3">
                        <input type="radio" class="form-check-input" name="gender" id="radioFemale">
                        <label class="form-check-label" for="radioFemale">Жінка</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12">
                    <label class="form-label" for="startDate">Оберіть дату народження:</label>
                    <input id="startDate" v-model="birthDate" class="form-control" type="date" required />
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3" id="registerButton">Зареєструватись</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      passwordAgain: '',
      gender: 'male',
      birthDate: '',
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.passwordAgain) {
        alert('Паролі не співпадають');
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          password: this.password,
          gender: this.gender,
          birthDate: this.birthDate,
        });

        alert('Реєстрація успішна');
        this.$router.push('/login'); // Перехід на сторінку логіну
      } catch (error) {
        console.error('Registration error', error);
        alert('Помилка реєстрації');
      }
    },
  },
};
</script>
