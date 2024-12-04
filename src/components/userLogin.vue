<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(to bottom, #f0f9ff, #e0f2fe);
      height: 100vh;
      color: #fff;
      font-family: 'Poppins', sans-serif;
      position: relative;
    "
  >
    <!-- Rays behind the right section -->
    <!-- <div
      class="rays"
      style="
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50%;
        background: radial-gradient(circle at center, rgba(255, 117, 140, 0.2) 20%, rgba(255, 117, 140, 0.3) 60%);
        pointer-events: none;
        z-index: 0;
      "
    ></div> -->

    <!-- Right section: Form -->
    <div
      style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 40px;
        text-align: center;
        position: relative;
        z-index: 1; /* Ensure it appears above the rays */
      "
    >
      <div style="margin-bottom: 10px;">
        <img
          src="../assets/logo_p1.png"
          alt="Foyr Logo"
          style="width: 150px; height: auto;"
        />
      </div>

      <h1
        style="
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          animation: slideIn 1s ease-out;
          color: black;
        "
      >
        Welcome to Customer Support Panel
      </h1>
      <button
        @click="loginUser"
        style="
          padding: 15px;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin: 0 auto;
          box-shadow: 0 8px 20px rgba(255, 117, 140, 0.5);
        "
      >
        Continue to Login
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "AdminPanel" });
    }
  },
};
</script>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
