
import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-1ca70-default-rtdb.firebaseio.com'
})

export default journalApi;