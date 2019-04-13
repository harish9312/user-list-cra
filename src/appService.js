import Axios from "axios";

export async function getAllUsers() {
    try {
        const response = await Axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        throw error;
    }
}