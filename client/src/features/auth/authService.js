import axios from 'axios';
const base_url = 'http://localhost:5175/api/users';

// register user
const signUP = async (userData) => {
    const response = await axios.post(`${base_url}/register-user`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// logout the user

const signOUT = () => {
    return localStorage.removeItem('user')
}


// login the user
const signIn = async (userData) => {
    const response = await axios.post(`${base_url}/login-user`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const getAllUsers = async () => {
    const response = await axios.get(`${base_url}/get-users`);
    return response.data
}


export const authService = {
    signUP,
    signOUT,
    signIn,
    getAllUsers
}

