document.addEventListener("DOMContentLoaded", () => {
const examList = document.getElementById("exam-list");

if (!examList) {
    console.error("The exam-list element was not found.");
    return;
}

loadExams();

async function loadExams() {
    try {
        const response = await fetch("data/exams.json");

        if (!response.ok) {
            throw new Error(`Failed to load exams: ${response.status}`);
        }

        const exams = await response.json();

        if (!Array.isArray(exams)) {
            throw new Error("The exam database must contain an array.");
        }

        examList.replaceChildren();

        if (exams.length === 0) {
            examList.textContent = "No examination environments are available yet.";
            return;
        }

        exams.forEach((exam) => {
            const card = document.createElement("article");
            card.className = "exam-card";

            const title = document.createElement("h3");
            title.textContent = exam.name;

            const description = document.createElement("p");
            description.textContent = exam.description;

            const status = document.createElement("span");
            status.className = `exam-status status-${exam.status}`;
            status.textContent =
                exam.status === "available" ? "Available" :
                exam.status === "planned" ? "Planned" :
                "Status unknown";

            card.append(title, description, status);

            if (exam.status === "available" && exam.id === "gate") {
                const button = document.createElement("a");
                button.href = "gate/index.html";
                button.className = "button";
                button.textContent = "Explore GATE";
                card.appendChild(button);
            }

            examList.appendChild(card);
        });
    } catch (error) {
        console.error("Unable to load examination data:", error);
        examList.textContent =
            "We couldn't load the examination environments. Please try again later.";
    }
}

});
