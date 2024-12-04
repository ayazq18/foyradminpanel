<template>
    <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom, #faedf0, #faedf0);
        height: 100vh;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        position: relative;
      ">
        <!-- Top-right logo -->
        <div style="
          position: absolute;
          top: 20px;
          right: 20px;
        ">
            <img src="../assets/logo_p1.png" alt="Foyr Logo" style="width: 100px; height: auto;" />
        </div>

        <!-- Loader Section -->
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
            <div class="loader-wrapper">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <h1 style="
            font-size: 2rem;
            font-weight: 700;
            margin-top: 30px;
            letter-spacing: 1.5px;
            animation: slideIn 1s ease-out;
            color: #ff7eb3;
          ">
                Authenticatng...
            </h1>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    methods: {
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
        if (code && state && sessionState) {
            this.loginUserWithParams(code, state, sessionState).then(() => {
                const token = localStorage.getItem("token");
                if (token) {
                    this.$router.push({ name: 'AdminPanel' });
                }
            });
        } else {
            const token = localStorage.getItem("token");
            if (token) {
                this.$router.push({ name: 'AdminPanel' });
            }
        }
    },
}
</script>

<style scoped>
/* Loader Animation */
.loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff7eb3;
    animation: bounce 1.2s infinite;
}

.circle:nth-child(2) {
    animation-delay: 0.2s;
}

.circle:nth-child(3) {
    animation-delay: 0.4s;
}

.circle:nth-child(4) {
    animation-delay: 0.6s;
}

/* Bounce Animation */
@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0.8);
    }

    50% {
        transform: scale(1.2);
    }
}

/* Slide-in Animation */
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