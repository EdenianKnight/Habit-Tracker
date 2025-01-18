document.addEventListener("DOMContentLoaded", () => {
    const habitList = document.querySelector("#habit-list");
    const habitForm = document.querySelector("#habit-form");
    const habits = JSON.parse(localStorage.getItem("guestHabits")) || [];

    // Render habits
    function renderHabits() {
        habitList.innerHTML = "";
        habits.forEach((habit, index) => {
            const li = document.createElement("li");
            li.textContent = habit.name;
            li.classList.add("habit-item");

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("btn-delete");
            deleteBtn.addEventListener("click", () => {
                habits.splice(index, 1);
                saveAndRender();
            });

            li.appendChild(deleteBtn);
            habitList.appendChild(li);
        });
    }

    // Save habits to localStorage
    function saveHabits() {
        localStorage.setItem("guestHabits", JSON.stringify(habits));
    }

    // Add new habit
    habitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const habitName = habitForm.habit.value.trim();
        if (habitName) {
            habits.push({ name: habitName });
            habitForm.reset();
            saveAndRender();
        }
    });

    // Save and render habits
    function saveAndRender() {
        saveHabits();
        renderHabits();
    }

    // Initial render
    renderHabits();
});