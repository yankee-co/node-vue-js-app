import axios from 'axios'

const url = 'http://localhost:5000/api/posts/';

class PostService{

    // Get Posts
    static async getPosts() {
        const res = await axios.get(url);
        return res.data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));
    }


    // Create Posts
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete posts
    static deletePost(id) {
        const token = localStorage.getItem('authToken');
        return axios.delete(`${url}${id}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    }


    // Send answer
    static sendResponse(surveyId, answer) {
        return axios.post(url + 'response', {
            surveyId,
            answer
        });
    }

}

export default PostService