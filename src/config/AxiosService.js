import Axios from 'axios';

const AxiosService = Axios.create({
    baseURL: 'http://localhost:8080/'
});

export default AxiosService;
