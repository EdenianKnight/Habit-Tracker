document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    const guestSection = document.getElementById('guest-tracker');
    const guestModeBtn = document.getElementById('guest-mode-btn');
    const habitForm = document.getElementById('habit-form');
    const habitList = document.getElementById('habit-list');
    const habits = [];

    // Toggle guest mode
    guestModeBtn.addEventListener('click', () => {
        welcomeSection.classList.add('hidden');
        guestSection.classList.remove('hidden');
    });

    // Handle habit form submission
    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const habitInput = habitForm.querySelector('input[name="habit"]');
        const habitText = habitInput.value.trim();
        
        if (habitText) {
            addHabit(habitText);
            habitInput.value = '';
        }
    });

    // Add new habit
    function addHabit(text) {
        const habit = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        habits.push(habit);
        renderHabit(habit);
    }

    // Render habit item
    function renderHabit(habit) {
        const li = document.createElement('li');
        li.className = 'habit-item';
        li.innerHTML = `
            <span>${habit.text}</span>
            <button class="btn btn-delete" data-id="${habit.id}">Delete</button>
        `;
        
        const deleteBtn = li.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => {
            const index = habits.findIndex(h => h.id === habit.id);
            if (index > -1) {
                habits.splice(index, 1);
                li.remove();
            }
        });
        
        habitList.appendChild(li);
    }
});