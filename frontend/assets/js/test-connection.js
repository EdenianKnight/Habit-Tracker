// Function to test backend connection
async function testBackendConnection() {
    try {
        const response = await fetch('http://localhost:5000/api/test');
        const data = await response.json();
        console.log('Backend Response:', data);
        alert('Backend Connection Successful: ' + data.message);
    } catch (error) {
        console.error('Connection Error:', error);
        alert('Connection Failed: ' + error.message);
    }
}

// Function to test user signup
async function testSignup(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log('Signup Response:', data);
        return data;
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
}

// Function to test user login
async function testLogin(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log('Login Response:', data);
        return data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
}

// Export the test functions
export { testBackendConnection, testSignup, testLogin };