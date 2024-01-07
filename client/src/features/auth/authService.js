import axios from 'axios';
// base url
const base_url = 'http://localhost:5175/api/users';

// request to the server for registration

const registerUser = async (userData) => {
    // request the server
    const response = await axios.post(`${base_url}/register-user`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}


export const authService = {
    registerUser
}


