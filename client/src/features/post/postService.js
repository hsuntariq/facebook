import axios from 'axios';
const base_url = 'http://localhost:5175/api/caption'

const postCaption = async (captionData) => {
    const response = await axios.post(`${base_url}/post-caption`, captionData)
    return response.data
}


export const postService = {
    postCaption
}