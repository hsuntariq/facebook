import axios from 'axios';
const base_url = 'http://localhost:5175/api'

const postCaption = async (captionData) => {
    const response = await axios.post(`${base_url}/caption/post-caption`, captionData)
    return response.data
}


const postImage = async (imageData) => {
    const response = await axios.post(`${base_url}/posts/create-post`, imageData);
    return response.data
}


export const postService = {
    postCaption,
    postImage
}