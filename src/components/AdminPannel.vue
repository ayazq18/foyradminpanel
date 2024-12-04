<template>
  <div class="main-wrapper">
    <div class="navbar">
      <div class="logo"><img src="../assets/foyr_logo.svg" alt="" /></div>
      <div class="logout" @click="Logout">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </div>
    </div>
    <div class="search-area">
      <div class="search-box">
        <!-- <div class="text-area">Search by email fetch data from the server</div> -->
        <div class="text-area">Enter Email</div>
        <div class="input-area">
          <input type="text" v-model="searchEmail" placeholder="Search by email" @input="fetchEmailPopUpData" />
          <div class="input-area-popup" v-if="emailResultsPopupRender && searchEmail != ''">
            <table>
              <tbody>
                <tr v-for="(item, index) in emailResultsPopupData" :key="index">
                  <td @click="setEmailValue(item)">{{ item.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="search-box">
        <div class="label"><label for="from-date">Enter from date</label></div>
        <div id="date" class="input-area">
          <input type="date" v-model="fromDate" placeholder="" />
        </div>
      </div>

      <div class="search-box">
        <div class="label"><label for="to-date">Enter to date</label></div>
        <div id="date" class="input-area">
          <input type="date" v-model="toDate" />
        </div>
      </div>

      <div id="submit">
        <button @click="fetchData">Get Data</button>
      </div>
    </div>

    <div class="result-wrapper">
      <div class="result">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Started</th>
              <th>Completed</th>
              <th>Views</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in results" :key="index">
              <td>{{ item.userData.fullName }}</td>
              <td>{{ item.userData.email }}</td>
              <td>{{ item.stateInfo.state }}</td>
              <td>{{ item.stateInfo.createdAt }}</td>
              <td>{{ item.completedAt }}</td>
              <td><button>View Details</button></td>
              <td>
                <button><i class="fa-solid fa-download"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="spinner-overlay">
      <div class="dots">
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
        <span style="--i: 4"></span>
        <span style="--i: 5"></span>
        <span style="--i: 6"></span>
        <span style="--i: 7"></span>
        <span style="--i: 8"></span>
        <span style="--i: 9"></span>
        <span style="--i: 10"></span>
        <span style="--i: 11"></span>
        <span style="--i: 12"></span>
        <span style="--i: 13"></span>
        <span style="--i: 14"></span>
        <span style="--i: 15"></span>
      </div>
    </div>
    <div id="overlay" class="image-overlay-container">
  <div class="overlay-header">
    <span id="close-button" class="close-icon">✖</span>
  </div>
  <div class="image-container">
    <img src="path-to-your-image.jpg" alt="Main Image" />
  </div>
</div>





  </div>
</template>

<script setup>
import { ref, watch,onMounted } from "vue";
import axios from "axios";
// import { useRouter } from 'vue-router';

// const router = useRouter();

const searchEmail = ref("");
const searchEmailId = ref("");
const fromDate = ref(null);
const toDate = ref(null);
const results = ref([]);
const emailResultsPopupData = ref([]);
const emailResultsPopupRender = ref(false);

const spinneroverlay = document.getElementsByClassName("spinner-overlay");

function showspinner() {
  spinneroverlay[0].style.display = "flex";
}

function hideSpinner() {
  spinneroverlay[0].style.display = "none";
}

// const searchbutton = computed(() => {
//   return (
//     searchEmail.value.trim() !== "" &&
//     fromDate.value &&
//     toDate.value &&
//     fromDate.value <= toDate.value
//   );
// });
// Close button functionality


onMounted(() => {
  const closeButton = document.getElementById('close-button');
  const overlay = document.getElementById('overlay');

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (overlay) {
        overlay.style.display = 'none';
      }
    });
  } else {
    console.error('Close button not found in the DOM');
  }
});

const validateDates = () => {
  if (fromDate.value && toDate.value) {
    const from = new Date(fromDate.value);
    const to = new Date(toDate.value);

    if (from > to) {
      alert("From date cannot be greater than To date.");
      fromDate.value = "";
      return;
    }

    const differenceInDays = (to - from) / (1000 * 60 * 60 * 24);

    if (differenceInDays > 30) {
      alert("The difference between dates should not exceed 30 days.");
      toDate.value = "";
      return;
    }
  }
};

watch(fromDate, validateDates);
watch(toDate, validateDates);

const fetchData = async () => {
  try {
    let query = "";

    showspinner();
    if (searchEmailId.value) query += `userId=654dc727c53735402a5f4b4e&`;
    if (fromDate.value) query += `startAt=${formatDateToISO(fromDate.value)}&`;
    if (toDate.value) query += `endAt=${formatDateToISO(toDate.value)}&`;

    const response = await axios.get(
      ` https://magikrendermaster.foyr.com/api/render/list${(searchEmailId.value != '' && fromDate.value != '' && toDate.value != '') ? `?${query}` : ""}`,
      {
        headers: {
          Authorization: "Bearer s8Y605sMP6mAr86EH32Vgu9Gk5s_vC9tXn_L_vM_ZY0",
        },
      }
    );

    for (const item of response.data.data) {
      item.completedAt = await formatDate(item.completedAt);
      item.stateInfo.createdAt = await formatDate(item.stateInfo.createdAt);
    }
    results.value = response.data.data;

    hideSpinner();
    console.log("helo", results.value);
  } catch (error) {
    hideSpinner();
    console.error("Error fetching data:", error);
  }
};

// function Logout() {
//   localStorage.removeItem("token")
//   router.push({ name: "Login" });

// }

const Logout = async () => {
  try {
    const response = await axios.post(
      "https://neo.foyr.com/api/auth/logout",
      {}, // Empty body since it's a logout request
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (response) {
      localStorage.removeItem('token')
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};


function formatDateToISO(inputDate) {
  const date = new Date(inputDate);

  date.setUTCHours(18, 30, 0, 0);

  return date.toISOString().replace(".000", "");
}

const fetchEmailPopUpData = async () => {
  try {
    let query = "";
    if (searchEmail.value) query += `search=${searchEmail.value}&`;

    const response = await axios.get(
      `https://magikrendermaster.foyr.com/api/users?${query}`,
      {
        headers: {
          Authorization: "Bearer s8Y605sMP6mAr86EH32Vgu9Gk5s_vC9tXn_L_vM_ZY0",
        },
      }
    );
    emailResultsPopupRender.value = true;
    emailResultsPopupData.value = response.data.users;

    console.log(emailResultsPopupData.value);
  } catch (error) {
    emailResultsPopupData.value = [];
    console.error("Error fetching data:", error);
  }
};
const setEmailValue = async (item) => {
  try {
    searchEmail.value = item.email;
    searchEmailId.value = item._id;
    emailResultsPopupRender.value = false
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const formatDate = async (inputDate) => {
  const date = new Date(inputDate);


  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Format hours and minutes into 12-hour format with AM/PM
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const amPm = hours < 12 ? 'AM' : 'PM';
  console.log(`${day} ${month} / ${formattedHours}:${minutes} ${amPm}`)
  // Combine into the final format
  return `${day} ${month} / ${formattedHours}:${minutes} ${amPm}`;
};


onMounted(fetchData);



</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "@fortawesome/fontawesome-free/css/all.css";
body {
  margin: 0;
  padding: 0;

}

html {
  margin: 0;
  padding: 0;
}

.main-wrapper {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  background-color: white;


  .navbar {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    // background: #7343ea;
    background-color: #ccc;
    // background-color: gray;
    box-shadow: 0px 4px 20px 0px #0000001f;

    .logo {
      font-weight: 600;
      font-size: 18px;
      color: white;
      cursor: pointer;
    }

    .logout {
      cursor: pointer;
      font-weight: 500;
      font-size: 18px;
      color: white;
      cursor: pointer;

      i {
        color: rgb(0, 0, 0);
      }
    }
  }

  .search-area {
    margin: 1rem;
    max-height: 20%;
    background-color: white;
    box-shadow: 0px 4px 20px 0px #0000001f;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    .search-box {
      width: 15%;
      height: 10rem;
      // background-color: aquamarine;
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      // justify-content: center;
      background-color: #ffffff;

      .input-area {
        width: 100%;
        // margin-top: 1rem;
        height: 40px;
        padding: 8px 0;
        border-bottom: 1px solid #5a3b3b;
        position: relative;

        .input-area-popup {
          position: absolute;
          left: 0;
          top: 100%;
          max-height: 200px;
          overflow-y: scroll;
          // width: 100%;
          background-color: white;
          box-shadow: 0 0 10px 0px black;
          z-index: 1000;
          border-radius: 10px;

          &::-webkit-scrollbar {
            display: none;
          }

          td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
        }

        input {
          width: 100%;
          height: 100%;
          padding: 8px;
          font-size: 16px;
          font-family: Montserrat, sans-serif;
          border: none;
          outline: none;
          background-color: transparent;

          &::-webkit-calendar-picker-indicator {
            margin-right: 8px;
          }
          &:focus {
            border-color: #939090;
            outline: none;
          }
        }
      }

      .label {
        // position: absolute;
        // top: 0.2rem;
        // left: 3rem;
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        line-height: 18.2px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        // color: #939090;
        color: #676565;
        margin-top: 1rem;
      }

      .text-area {
        margin-top: 1rem;
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        line-height: 18.2px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #676565;
      }
    }

    #submit {
      display: flex;

      justify-content: center;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        all: unset;
        width: 6.5rem;
        height: 3rem;
        border-radius: 4.5rem;
        background: #7343ea;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
      }
    }
  }

  
  .result {
    margin: 1rem;
    max-height: 400px;
    margin-top: 4rem;
  

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
      border: 1px solid #ccc;
    }

    th,
    td {
      padding: 12px;
      text-align: left;
      border: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    button {
      all: unset;
      display: inline-block;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      font-family: Inter, sans-serif;
      color: #ffffff;
      background-color: #7343ea;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      transition: background-color 0.3s, transform 0.2s;

      i {
        margin-right: 8px;
      }

      &:hover {
        background-color: #5a32b8;
        transform: scale(1.05);
      }

      &:active {
        background-color: #422493;
        transform: scale(1);
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }

  .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .spinner-overlay.active {
    display: flex;
  }
  .dots span {
    position: absolute;
    height: 10px;
    width: 10px;
    background: #fff;
    border-radius: 50%;
    transform: rotate(calc(var(--i) * (360deg / 15))) translateY(35px);
    animation: animate 1.5s linear infinite;
    animation-delay: calc(var(--i) * 0.1s);
    opacity: 0;
  }
  @keyframes animate {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .image-overlay-container {
  position: absolute; 
  top: 5%;
  left: 5%;
  height: 90vh;
  width: 90%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;

}

.image-overlay-container > .child {
  position: relative; 
}
.overlay-header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
}

.close-icon {
  font-size: 24px;
  cursor: pointer;
  color: black;
  // background: #ffffff;
  border-radius: 50%;
  padding: 5px;
  margin: 10px;
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

}
</style>
