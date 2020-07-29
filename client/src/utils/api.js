import axios from 'axios';

export function fetchAppointmentList() {
    axios({
        method: 'post',
        baseURL:'http://localhost:5050',
        url: '/api/appointment/GetAppointments',
        params: {
            'Date' : '08/15/2020'
        },
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json'},
    }).then(data => data);
}

