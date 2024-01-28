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


const getPosts = async () => {
    const response = await axios.get(`${base_url}/posts/get-posts`)
    return response.data
}


const likePost = async (likeData) => {
    const response = await axios.post(`${base_url}/posts/like-post`, likeData)
    return response.data
}

const singlePost = async (data) => {
    const response = await axios.get(`http://localhost:5175/api/posts/get-single-post`, data);
    return response.data
}

const sharePost = async (data) => {
    const response = await axios.post(`${base_url}/posts/share-post`, data);
    return response.data
}


export const postService = {
    postCaption,
    postImage,
    getPosts,
    likePost,
    singlePost,
    sharePost
}