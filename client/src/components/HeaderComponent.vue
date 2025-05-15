<template>
    <div class = "bg-light border-bottom d-flex" style="border-color: #cbcbcb;">
        <ul id = "ul-menu" class="nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/">Головна</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/surveys">Опитування</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/create">Створити опитування</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/register">Реєстрація</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Вхід</router-link>
            </li>
        </ul>
        <div id="user-container" v-if="isLoggedIn" class = "position-absolute end-0 top-0 translate-y me-3">
            <svg id = "user-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            <span id = "emailHolder" class="ms-2">{{ email }}</span>
            <button id = "logoutBtn" class="btn btn-outline-secondary btn-sm ms-3" @click="logout">Вийти</button>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,  // Спочатку користувач не залогінений
      email: ''
    };
  },
  mounted() {
    // Перевіряємо наявність токену після того, як компонент змонтований
    this.checkAuthStatus();
  },
  methods: {
    checkAuthStatus() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isLoggedIn = true;
        this.email = localStorage.getItem('userEmail'); // Отримуємо email з localStorage
      } else {
        this.isLoggedIn = false;
        this.email = '';
      }
    },
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      this.checkAuthStatus(); // Оновлюємо статус
    }
  }
};
</script>

<style scoped>
    #user-container{
        margin-left: auto;
    }
    #ul-menu {
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
    }
    @media (max-width: 1200px) {
        #user-icon, #emailHolder{
            display: none;
        }
        #user-container{
            position: relative;
            display: flex;
        }
    }
    @media (max-width: 228px){
        #ul-menu{
            justify-content: left;
        }
    }
    @media (max-width: 780px){
        #ul-menu{
            margin: 0px;
            padding-right: 70px;
            justify-content: start;
        }
    }
</style>