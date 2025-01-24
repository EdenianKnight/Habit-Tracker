import api from './services/api.js';

console.log("Small Steps Habit Tracker App Initialized");

// Elements
const guestSection = document.getElementById("guest-section");
const authSection = document.getElementById("auth-section");
const tryGuestBtn = document.getElementById("try-guest-btn");
const signUpBtn = document.getElementById("sign-up-btn");
const logInBtn = document.getElementById("log-in-btn");
const habitForm = document.getElementById("habitForm");
const habitTable = document.getElementById("habitTable")?.querySelector("tbody");

// API Functions
async function saveHabitToServer(habitName) {
    try {
        const response = await fetch('http://localhost:5000/api/guest/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: habitName })
        });
        if (!response.ok) throw new Error('Failed to save habit');
        return await response.json();
    } catch (error) {
        console.error('Error saving habit to server:', error);
        // Fallback to local storage if server fails
        return saveGuestHabit(habitName);
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

async function signUpUser(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email, 
                password, 
                username: email.split('@')[0] 
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Signup error details:', errorData);
            throw new Error(errorData.error || 'Signup failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Signup error:', error);
        alert(error.message || 'Signup failed. Please try again.');
        return false;
    }
}

// Guest Mode Functions
function saveGuestHabit(habitName) {
    const habits = getGuestHabits();
    const newHabit = {
        name: habitName,
        completed: false,
        id: Date.now()
    };
    habits.push(newHabit);
    localStorage.setItem('guestHabits', JSON.stringify(habits));
    return newHabit;
}

function getGuestHabits() {
    return JSON.parse(localStorage.getItem('guestHabits') || '[]');
}

function updateGuestHabit(habitId, completed) {
    const habits = getGuestHabits();
    const habitIndex = habits.findIndex(h => h.id === habitId);
    if (habitIndex !== -1) {
        habits[habitIndex].completed = completed;
        localStorage.setItem('guestHabits', JSON.stringify(habits));
    }
}

// Display habits in table
function displayHabits(habits) {
    if (!habitTable) return;
    
    habitTable.innerHTML = '';
    habits.forEach(habit => {
        const newRow = habitTable.insertRow();
        newRow.insertCell(0).textContent = habit.name;
        
        const checkboxCell = newRow.insertCell(1);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;
        checkbox.addEventListener('change', async () => {
            try {
                // Try to update on server first
                await fetch(`http://localhost:5000/api/guest/habits/${habit.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ completed: checkbox.checked })
                });
            } catch (error) {
                console.error('Error updating habit on server:', error);
                // Fallback to local storage
                updateGuestHabit(habit.id, checkbox.checked);
            }
        });
        checkboxCell.appendChild(checkbox);
    });
}

// Event: Try as Guest
if (tryGuestBtn) {
    tryGuestBtn.addEventListener("click", async function () {
        alert("You're now in guest mode. Progress will be saved locally and synced when possible.");
        guestSection.style.display = "block";
        authSection.style.display = "none";
        displayHabits(getGuestHabits());
    });
}

// Event: Add Habit (Guest Mode)
if (habitForm) {
    habitForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const habitName = document.getElementById("habitName").value;

        if (habitName.trim() === "") {
            alert("Please enter a habit.");
            return;
        }

        const newHabit = await saveHabitToServer(habitName);
        displayHabits(getGuestHabits());
        document.getElementById("habitName").value = "";
    });
}

// Event: Sign-Up Form
const signUpForm = document.getElementById("signUpForm");
if (signUpForm) {
    signUpForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const result = await signUpUser(email, password);
        if (result) {
            alert("Sign-up successful! Please log in.");
            window.location.href = "login.html";
        }
    });
}

// Event: Log-In Form
const logInForm = document.getElementById("logInForm");
if (logInForm) {
    logInForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;

        const success = await loginUser(loginEmail, loginPassword);
        if (success) {
            alert("Login successful! Welcome back.");
            const guestHabits = getGuestHabits();
            if (guestHabits.length > 0) {
                const convertHabits = confirm(
                    "Would you like to convert your guest habits to your account?"
                );
                if (convertHabits) {
                    // Upload guest habits to server
                    try {
                        await Promise.all(guestHabits.map(habit => 
                            saveHabitToServer(habit.name)
                        ));
                        localStorage.removeItem('guestHabits');
                    } catch (error) {
                        console.error('Error converting habits:', error);
                    }
                }
            }
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
}

// Keep the existing redirect event listeners
if (signUpBtn) {
    signUpBtn.addEventListener("click", function () {
        window.location.href = "signup.html";
    });
}

if (logInBtn) {
    logInBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

// Load guest habits on page load if in guest section
if (guestSection && guestSection.style.display !== "none") {
    displayHabits(getGuestHabits());
}