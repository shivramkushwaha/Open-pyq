"use strict";

// Open-PYQ: Main JavaScript file

document.addEventListener("DOMContentLoaded", function () {
console.log("Open-PYQ is ready!");

const examList = document.getElementById("exam-list");

if (!examList) {
    console.error("The examination list element was not found.");
    return;
}

examList.textContent =
    "Welcome to Open-PYQ! Examination environments will appear here.";

});
