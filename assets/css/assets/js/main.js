"use strict";

document.addEventListener("DOMContentLoaded", function () {
const examList = document.getElementById("exam-list");

if (!examList) {
    console.error("Examination list element not found.");
    return;
}

loadExams();

async function loadExams() {
    try {
        const response = await fetch("data/exams.json");

        if (!response.ok) {
            throw new Error("Could not load examination data.");
        }

        const exams = await response.json();

        displayExams(exams);
    } catch (error) {
        console.error(error);

        examList.textContent =
            "Unable to load examinations. Please try again later.";
    }
}

function displayExams(exams) {
    examList.replaceChildren();

    exams.forEach(function (exam) {
        const card = document.createElement("article");
        card.className = "exam-card";

        const title = document.createElement("h3");
        title.textContent = exam.name;

        const description = document.createElement("p");
        description.textContent = exam.description;

        const status = document.createElement("p");
        status.className = "exam-status";
        status.textContent =
            exam.status === "available"
                ? "Available"
                : "Coming soon";

        card.append(title, description, status);
        examList.appendChild(card);
    });
}

});
