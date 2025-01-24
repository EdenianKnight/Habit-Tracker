import api from './services/api.js';

// Elements
const habitForm = document.getElementById('habitForm');
const habitList = document.getElementById('habitList');
const logoutBtn = document.getElementById('logout-btn');

// Fetch and display user's habits
async function fetchUserHabits() {
    try {
        // This assumes you have a backend route to fetch user habits
        const habits = await api.request('/habits');
        displayHabits(habits);
    } catch (error) {
        console.error('Error fetching habits:', error);
        alert('Failed to load habits. Please try again.');
    }
}

// Display habits in the table
function displayHabits(habits) {
    habitList.innerHTML = ''; // Clear existing habits
    
    habits.forEach(habit => {
        const row = habitList.insertRow();
        
        // Habit Name
        row.insertCell(0).textContent = habit.name;
        
        // Status
        const statusCell = row.insertCell(1);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = habit.completed;
        checkbox.addEventListener('change', async () => {
            try {
                await api.updateHabit(habit.id, { completed: checkbox.checked });
            } catch (error) {
                console.error('Error updating habit:', error);
                checkbox.checked = !checkbox.checked; // Revert visual state
            }
        });
        statusCell.appendChild(checkbox);
        
        // Actions (delete button)
        const actionsCell = row.insertCell(2);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
            try {
                await api.request(`/habits/${habit.id}`, 'DELETE');
                row.remove();
            } catch (error) {
                console.error('Error deleting habit:', error);
                alert('Failed to delete habit.');
            }
        });
        actionsCell.appendChild(deleteBtn);
    });
}

// Add new habit
habitForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const habitNameInput = document.getElementById('habitName');
    const habitName = habitNameInput.value.trim();

    if (!habitName) {
        alert('Please enter a habit name');
        return;
    }

    try {
        const newHabit = await api.saveHabit({ name: habitName });
        displayHabits([...habitList.children, newHabit]);
        habitNameInput.value = ''; // Clear input
    } catch (error) {
        console.error('Error adding habit:', error);
        alert('Failed to add habit. Please try again.');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Initialize - fetch habits when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login if no token
        window.location.href = 'login.html';
        return;
    }

    fetchUserHabits();
});
