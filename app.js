// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHWinjkY1r2L_5ddVKggnB4KtCuM8AmA8",
    authDomain: "rohiz-database-4d310.firebaseapp.com",
    databaseURL: "https://rohiz-database-4d310-default-rtdb.firebaseio.com",
    projectId: "rohiz-database-4d310",
    storageBucket: "rohiz-database-4d310.appspot.com",
    messagingSenderId: "804176273664",
    appId: "1:804176273664:web:29ad7df50b062c01f9d3e5",
    measurementId: "G-9NLN46FWKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch data and display in the table
async function fetchData() {
    const dbRef = ref(database, "students");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        const data = snapshot.val();
        const tableBody = document.querySelector("#studentTable tbody");
        tableBody.innerHTML = ""; // Clear old data

        let index = 1;
        const subjectCountsStrong = {};  // Count for strong subjects
        const subjectCountsWeak = {};    // Count for weak subjects
        let totalStudents = 0;          // Total number of students

        for (const key in data) {
            const student = data[key];
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index++}</td>
                <td>${student.name}</td>
                <td>${student.mobile}</td>
                <td>${student.strongSubject}</td>
                <td>${student.weakSubject}</td>
                <td>${student.suggestions}</td>
                <td>${new Date(student.time).toLocaleString()}</td>
            `;

            // Count strong and weak subjects
            subjectCountsStrong[student.strongSubject] = (subjectCountsStrong[student.strongSubject] || 0) + 1;
            subjectCountsWeak[student.weakSubject] = (subjectCountsWeak[student.weakSubject] || 0) + 1;

            totalStudents++;  // Increase total student count
            tableBody.appendChild(row);
        }

        // Display subject percentages
        displaySubjectPercentages(subjectCountsStrong, subjectCountsWeak, totalStudents);
    } else {
        alert("No data found!");
    }
}

// Function to display the percentage of strong and weak subjects
function displaySubjectPercentages(strongCounts, weakCounts, totalStudents) {
    const strongSubjectPercentage = {};
    const weakSubjectPercentage = {};

    // Calculate percentage for strong subjects
    for (const subject in strongCounts) {
        strongSubjectPercentage[subject] = ((strongCounts[subject] / totalStudents) * 100).toFixed(2);
    }

    // Calculate percentage for weak subjects
    for (const subject in weakCounts) {
        weakSubjectPercentage[subject] = ((weakCounts[subject] / totalStudents) * 100).toFixed(2);
    }

    // Display the percentages
    let strongSubjectsText = "<strong>Strong Subjects Percentages:</strong><br>";
    for (const subject in strongSubjectPercentage) {
        strongSubjectsText += `${subject}: ${strongSubjectPercentage[subject]}%<br>`;
    }

    let weakSubjectsText = "<strong>Weak Subjects Percentages:</strong><br>";
    for (const subject in weakSubjectPercentage) {
        weakSubjectsText += `${subject}: ${weakSubjectPercentage[subject]}%<br>`;
    }

    document.getElementById("strongSubjectsCount").innerHTML = strongSubjectsText;
    document.getElementById("weakSubjectsCount").innerHTML = weakSubjectsText;
}

function Login(){
    let x = new Date().getDate();
    let y = new Date().getHours().toString().padStart(2, '0');
    let password = "Rohit" +x +y 
    const pass = document.getElementById("ps").value;
    if (pass==password){
    const passwordDialog= document.getElementById("passwordDialog");
    const  main = document.getElementById("main");
    main.style.display= "block";
    passwordDialog.style.display= "none";
fetchData();
    }
    else if(pass==""){
        document.getElementById('rps2').innerText ="*Enter password";
  
    }
    else{
        document.getElementById('rps2').innerText ="*Wrong password";
    }
}
// Add Event Listener to Button
document.getElementById("login").addEventListener("click",Login);
document.getElementById("rdata").addEventListener("click",fetchData);

// Search Functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#studentTable tbody tr");

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

 
