document.addEventListener("DOMContentLoaded", () => {
    const subjectList = document.getElementById("subject-list");

    if (!subjectList) {
        console.error("The subject-list element was not found.");
        return;
    }

    loadSyllabus();

    async function loadSyllabus() {
        try {
            const response = await fetch(
                "../data/gate-mathematics-syllabus.json"
            );

            if (!response.ok) {
                throw new Error(
                    `Unable to load syllabus: ${response.status}`
                );
            }

            const syllabus = await response.json();
            const subjects = syllabus.subjects;

            if (!Array.isArray(subjects)) {
                throw new Error("Invalid syllabus data.");
            }

            subjectList.replaceChildren();

            if (subjects.length === 0) {
                subjectList.textContent =
                    "No syllabus subjects are available yet.";
                return;
            }

            subjects.forEach((subject) => {
                const card = document.createElement("article");
                card.className = "subject-card";

                const title = document.createElement("h3");
                title.textContent = subject.name;

                const topicCount = document.createElement("p");
                topicCount.textContent =
                    `${subject.topics.length} topics`;

                const topicList = document.createElement("ul");
                topicList.className = "topic-list";

                subject.topics.forEach((topic) => {
                    const item = document.createElement("li");
                    item.textContent = topic;
                    topicList.appendChild(item);
                });

                const toggleButton = document.createElement("button");
                toggleButton.type = "button";
                toggleButton.className = "topic-toggle";
                toggleButton.textContent = "View topics";
                toggleButton.setAttribute("aria-expanded", "false");

                topicList.hidden = true;

                toggleButton.addEventListener("click", () => {
                    const isExpanded =
                        toggleButton.getAttribute("aria-expanded") === "true";

                    topicList.hidden = isExpanded;
                    toggleButton.setAttribute(
                        "aria-expanded",
                        String(!isExpanded)
                    );

                    toggleButton.textContent =
                        isExpanded ? "View topics" : "Hide topics";
                });

                card.append(
                    title,
                    topicCount,
                    toggleButton,
                    topicList
                );

                subjectList.appendChild(card);
            });
        } catch (error) {
            console.error("Syllabus loading error:", error);

            subjectList.textContent =
                "Unable to load the syllabus. Please try again later.";
        }
    }
});
