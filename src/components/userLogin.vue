<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(to bottom, #faedf0, #faedf0);
      height: 100vh;
      /* padding: 20px; */
      color: #fff;
      font-family: 'Poppins', sans-serif;
    "
  >
    <!-- Top-right logo -->
    <div
      style="
        position: absolute;
        top: 20px;
        right: 20px;
      "
    >
      <img
        src="../assets/logo_p1.png"
        alt="Foyr Logo"
        style="width: 100px; height: auto;"
      />
    </div>

    <!-- Left section: Large image -->
    <div
      style="
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <img
        src="../assets/zone_landing.webp"
        alt="Landing Image"
        style="
          max-width: 90%;
          max-height: 80%;
          animation: fadeIn 1s ease-out;
        "
      />
    </div>

    <!-- Right section: Form -->
    <div
      style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 40px;
        text-align: center;
      "
    >
      <h1
        style="
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          animation: slideIn 1s ease-out;
          color: black;
        "
      >
        Welcome to Admin Control Panel
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
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 60%;
          margin: 0 auto;
          box-shadow: 0 8px 20px rgba(255, 117, 140, 0.4);
        "
      >
        Continue to Login
      </button>
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

    
  },

 
};
</script>

<style scoped>
/* Main container styles */
.loginContainer {
  max-width: 500px;
  margin: 20px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 1s ease-out;
  overflow: hidden;
}

/* Image container styles */
.image-container {
  margin-bottom: 20px;
}

.image {
  width: 250px;
  animation: bounceIn 1s ease-out;
}

/* Title styling */
.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  animation: slideIn 1s ease-out;
}

/* Button styling */
.submit-button {
  padding: 15px;
  background: linear-gradient(90deg, #e6aab4, #574a4f);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(255, 117, 140, 0.4);
}

.submit-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 117, 140, 0.6);
}

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
