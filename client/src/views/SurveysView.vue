<template>
  <div class="d-flex flex-wrap m-auto" id="surveys-list">
    <div v-if="surveys.length === 0" class="text-muted">Немає опитувань.</div>
    <div v-for="(survey, index) in surveys" :key="survey._id" class="card m-4" style="border: 0;">
      <div class="card-body d-flex flex-column">
        
        <h5 class="card-title">
          <button class = "btn btn-outline-danger px-2 py-1" @click="deleteResponse(survey._id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
          {{ survey.question }}</h5>
        <form :id="'survey-' + index" class="survey-form">
          <ul class="list-group list-group-flush">
            <li v-for="(ans, i) in survey.answers" :key="i" class="list-group-item">
              <input type="radio" :name="'answer-' + index" :id="'answer-' + index + '-' + i" :value="ans">
              <label :for="'answer-' + index + '-' + i" id = "answer-label">{{ ans }}</label>
            </li>
          </ul>
        </form>
        <button id = "submitBtn" class="btn btn-success mt-3 mb-2"
          @click="submitResponse(survey._id, index)">
          Відправити відповідь
        </button>
        <small class="text-muted">Створено: {{ new Date(survey.createdAt).toLocaleString() }}</small>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import PostService from '@/PostService.js';

const surveys = ref([]);

// Отримання опитувань
const fetchSurveys = async () => {
  try {
    const response = await PostService.getPosts();
    surveys.value = response;
  } catch (error) {
    console.error("Не вдалося отримати опитування:", error);
  }
};

// Надсилання відповіді
const submitResponse = async (surveyId, index) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert("Щоб відповісти на опитування, увійдіть у свій акаунт.");
    window.location.href = '/login';
    return;
  }

  const selected = document.querySelector(`#survey-${index} input[name="answer-${index}"]:checked`);

  if (!selected) {
    alert("Оберіть відповідь перед відправленням.");
    return;
  }

  const answer = selected.value;

  try {
    await PostService.sendResponse(surveyId, answer);
    alert("Ваша відповідь збережена!");
  } catch (err) {
    console.error(err);
    alert("Не вдалося надіслати відповідь.");
  }
};

// Завантаження опитувань при завантаженні компонента
onMounted(() => {
  fetchSurveys();
});

const deleteResponse = async (id) => { 
  if (!confirm("Ви дійсно хочете видалити це опитування?")) return;

  try {
    await PostService.deletePost(id);
    alert("Опитування видалено!");
    surveys.value = surveys.value.filter(s => s._id !== id); // оновлюємо реактивно
  } catch (err) {
    console.error("Помилка при видаленні:", err);
    alert("Не вдалося видалити опитування.");
  }
};

</script>

<style scoped>
#surveys-list {
  width: 100%;
  max-width: 1200px;
}
#answer-label{
  padding-left: 10px;
}
#submitBtn {
  max-width: 250px;
}
</style>
