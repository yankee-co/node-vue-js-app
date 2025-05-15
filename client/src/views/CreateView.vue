<template>
  <div class="container my-auto d-flex flex-column justify-content-center" style="max-width: max-content; min-width: 40%;">
    <div>
      <p class="fs-3 w-100 text-center fw-bold">Створити опитування</p>
      <label class="form-label">Питання:</label>
      <input type="text" v-model="question" class="form-control" placeholder="Введіть питання" />

      <label class="form-label my-2">Варіанти відповідей:</label>
      <div class="mt-1" id="answers-container">
        <input
          v-for="(answer, index) in answers"
          :key="index"
          v-model="answers[index]"
          type="text"
          class="answer w-100 form-control my-2"
          placeholder="Варіант відповіді"
        />
      </div>

      <div class="buttons my-3">
        <button class="btn btn-primary" id = "addAnswerBtn" @click="addAnswer">Додати відповідь</button>
        <button type="button" id = "removeAnswerBtn" class="btn btn-danger" @click="removeAnswer" :disabled="answers.length <= 1">Прибрати відповідь</button>
        <button class="btn btn-primary" id = "saveSurvey" @click="saveSurvey">Зберегти опитування</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      question: '',
      answers: ['']
    };
  },
  methods: {
    addAnswer() {
      this.answers.push('');
    },
    resetForm() {
      this.question = '';
      this.answers = [''];
    },
    async saveSurvey() {
      const trimmedQuestion = this.question.trim();
      const trimmedAnswers = this.answers.map(a => a.trim()).filter(a => a);

      if (!trimmedQuestion || trimmedAnswers.length === 0) {
        alert("Введіть питання та хоча б одну відповідь.");
        return;
      }

      const survey = {
        question: trimmedQuestion,
        answers: trimmedAnswers,
        createdAt: new Date().toISOString()
      };

      try {
        console.log("Survey data to save:", survey);  // Перевіряємо, що передається на сервер
        await axios.post('http://localhost:5000/api/posts/', survey, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        alert("Опитування збережено!");
        this.resetForm();
      } catch (error) {
        console.error("Помилка при збереженні опитування:", error);
        alert("Не вдалося зберегти опитування.");
      }
    },
    removeAnswer() {
      if (this.answers.length > 1) {
        this.answers.pop();
      }
    }
  }
};

</script>

<style scoped>
    #answers-container {
        display: flex;
        flex-direction: column;
        gap: 10px; /* Відступ між полями */
    }
    .container {
        padding: 20px;
        max-width: 600px;
        margin: auto;
    }

    #saveSurvey {
        background-color: #50C878;
        /* margin-left: 15px; */
        border: 1px solid rgba(0, 128, 0, 0.555);
    }

    #saveSurvey:hover {
        background-color: #37a85d;
    }

    @media (max-width: 590px) {
        .buttons {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
        }
        #addAnswerBtn, #removeAnswerBtn {
            margin-bottom: 10px !important;
        }
    }

    @media (min-width: 590px) {
        #addAnswerBtn, #removeAnswerBtn {
            margin-right: 15px;
        }
    }
</style>