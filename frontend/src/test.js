import axios from 'axios';

axios
    .post('http://0.0.0.0:5001/api/v1/login', {
        username: 'admin',
        password: 'admin',
    })
    .then((response) => {
        console.log(response.data); // => { token: ..., username: 'admin' }
    });
