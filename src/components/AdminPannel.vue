<template>
  <div class="main-wrapper">
    <div class="navbar">
      <div class="logo">RENDERING</div>
      <div class="logout" @click="Logout">
        <img class="icon" src="../assets/logout.svg" alt="" /> Logout
      </div>
    </div>
    <div class="search-area">
      <!-- <div class="search-box">
        <div class="input-area">
          <input type="text" v-model="searchJob" placeholder="Search Job" />
        </div>
        <div class="text-area">
          Search by job name, job status, or user email from the fetched results
        </div>
      </div> -->

      <div class="search-box">
        <div class="input-area">
          <input
            type="text"
            v-model="searchEmail"
            placeholder="Search by email"
            @input="fetchEmailPopUpData"
          />
          <div class="input-area-popup" v-if="emailResultsPopupRender && searchEmail!=''">
            <table>
              <tbody>
                <tr v-for="(item, index) in emailResultsPopupData" :key="index">
                  <td @click="setEmailValue(item)">{{ item.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-area">Search by email fetch data from the server</div>
      </div>
      <div class="search-box">
        <div class="label"><label for="from-date">Choose from date</label></div>
        <div id="date" class="input-area">
          <input type="date" v-model="fromDate" />
        </div>
      </div>

      <div class="search-box">
        <div class="label"><label for="to-date">Choose to date</label></div>
        <div id="date" class="input-area">
          <input type="date" v-model="toDate" />
        </div>
      </div>

      <div id="submit" class="search-box">
        <button @click="fetchData">Submit</button>
      </div>
    </div>

    <div class="result-wrapper">
      <div class="result">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Project</th>
              <th>Status</th>
              <th>Started</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in results" :key="index">
              <td>{{ item.userData.fullName }}</td>
              <td>{{ item.userData.email }}</td>
              <td>{{ item.project }}</td>
              <td>{{ item.stateInfo.state }}</td>
              <td>{{ item.stateInfo.createdAt }}</td>
              <td>{{ item.completedAt  }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter();

// const searchJob = ref("");
const searchEmail = ref("");
const searchEmailId = ref("");
const fromDate = ref("");
const toDate = ref("");
const results = ref([]);
const emailResultsPopupData = ref([]);
const emailResultsPopupRender = ref(false);

const fetchData = async () => {
  try {
    let query = "";
    // if (searchJob.value) query += `job=${searchJob.value}&`;
    if (searchEmailId.value) query += `userId=654dc727c53735402a5f4b4e&`;
    if (fromDate.value) query += `startAt=${formatDateToISO(fromDate.value)}&`;
    if (toDate.value) query += `endAt=${formatDateToISO(toDate.value)}&`;

    const response = await axios.get(
      ` https://magikrendermaster.foyr.com/api/render/list${(searchEmailId.value!='' && fromDate.value!='' && toDate.value!='')?`?${query}`:""}`,
      {
        headers: {
          Authorization: "Bearer s8Y605sMP6mAr86EH32Vgu9Gk5s_vC9tXn_L_vM_ZY0",
        },
      }
    );

    for (const item of response.data.data) {
      item.completedAt = await formatDate(item.completedAt);
      item.stateInfo.createdAt  = await formatDate(item.stateInfo.createdAt );
    }
    results.value = response.data.data;

    console.log("helo",results.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function Logout() {
  localStorage.removeItem("token")
  router.push({ name: "Login" });
 
}
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
    emailResultsPopupRender.value=true;
    emailResultsPopupData.value = response.data.users;

    console.log(emailResultsPopupData.value);

  } catch (error) {
    emailResultsPopupData.value = [];
    console.error("Error fetching data:", error);
  }
};
const setEmailValue = async (item) => {
  try {
    searchEmail.value=item.email;
    searchEmailId.value=item._id;
    emailResultsPopupRender.value=false
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const formatDate = async (inputDate) =>{
  const date = new Date(inputDate);

  // Get the day, month, hours, and minutes
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Format hours and minutes into 12-hour format with AM/PM
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const amPm = hours < 12 ? 'AM' : 'PM';
console.log(`${day} ${month} / ${formattedHours}:${minutes} ${amPm}`)
  // Combine into the final format
  return `${day} ${month} / ${formattedHours}:${minutes} ${amPm}`;
}


onMounted(fetchData);

 

</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

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

  .navbar {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    background: black;

    .logo {
      font-weight: 600;
      font-size: 18px;
      color: white;
    }

    .logout {
      font-weight: 500;
      font-size: 18px;
      color: white;
      cursor: pointer;
      .icon {
        fill: white;
      }
    }
  }

  .search-area {
    margin: 1rem;
    max-height: 20%;
    background-color: white;
    box-shadow: 0px 4px 20px 0px #0000001f;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .search-box {
      width: 15%;
      height: 10rem;
      background-color: white;
      display: flex;
      flex-direction: column;

      position: relative;
      // gap: 1rem;

      .input-area {
        width: 100%;
        margin-top: 1rem;
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
        }
      }

      .label {
        position: absolute;
        top: 0.2rem;
        left: 3rem;
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 18.2px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #939090;
      }

      .text-area {
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 18.2px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #939090;
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
        width: 5.5rem;
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

  .result-wrapper {
    width: 100vw;
    overflow-x: scroll;

    .result {
      margin: 1rem;
      max-height: 400px;

      width: 100%;

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
    }
  }
}
</style>
