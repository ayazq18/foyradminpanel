<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff7fa;
      height: 100vh;
    "
  >
    <div class="loginContainer">
      <div class="image-container">
        <img src="../assets/logo_p1.jpeg" alt="Foyr-logo" class="image" />
      </div>
      <div class="form-wrapper">
        <!-- Login Form -->
        <div class="form-container">
          <h1>Login</h1>
          <button class="submit-button" type="submit" @click="loginUser">
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//   import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {};
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.get(
          "https://neo.foyr.com/api/auth/loginurl"
        );
        if (response) {
          window.location.href = response.data.url;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async loginUserWithParams(code, state, sessionState) {
      try {
        const response = await axios.post("https://neo.foyr.com/api/auth", {
          code: code,
          state: state,
          session_state: sessionState,
        });
        if (response) {
          localStorage.setItem("token", response.data.token);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const sessionState = urlParams.get("session_state");
    const token = localStorage.getItem("token");
    if (token) {
        this.$router.push({ name: 'AdminPanel' });
    } else if (code && state && sessionState) {
      this.loginUserWithParams(code, state, sessionState);
    }
  },
};
</script>

<style>
.loginContainer {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 48px 0px rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
}

.form-wrapper {
  display: flex;
  width: 300px;
  height: 250px;
  /* transition: transform 0.6s ease-in-out; */
}

.form-container {
  width: 100%;
  margin: 0 auto;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
  font-family: "Poppins", sans-serif;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: bold;
}

.submit-button {
  padding: 12px;
  background: gray;
  color: white;
  border: 1px solid gray;
  border-radius: 25px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background: #2c3e50;
}

.image {
  width: 150px;
}
</style>
