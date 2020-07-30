import axios from 'axios';
import {getAppointmentData} from "./GetAppointmentData";
import moment from 'moment';

export function fetchAppointmentList(selectedDate) {
    var formattedDate = moment(selectedDate).format('DD/MM/YYYY');
    // return Promise.resolve(getAppointmentData);
    return axios({
        method: 'get',
        baseURL:'http://localhost:5050',
        url: '/api/appointment/GetAppointments',
        params: {
            'date' : formattedDate
        },
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Credentials':'true'},
    }).then(data => data.data);
}


export function SaveAppointment() {
    return axios({
        method: 'post',
        baseURL:'http://localhost:5050',
        url: '/api/appointment/CreateAppoitment',
        data: savePayload,
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Credentials':'true'},
    }).then(data => data);
}




const savePayload={
    "id": 0,
    "location_Id": 3510,
    "business_Type": "Spa",
    "business_Type_Id": 30,
    "state": "QC",
    "country": "Canada",
    "treatment_Id": 7, //dynamic
    "treatment_Name": "",//can be null
    "billable_Item_Id": 1800930,//anything
    "employee_Id": 51592,//dynamic
    "employee_Name": " ",//can be null
    "status": " ",//can be null
    "booked_Date": "2020-08-03T09:15:00",//any date cannot be null
              "start_Date": "2020-08-03T09:15:00",//selected date
              "end_Date": "2020-08-03T09:15:00",//any date cannot be null
              "cancellation_Type": "",//can be null
              "customer_Id": 138500068,//dynamic
              "customer_Name": " ",
              "customer_Age": 0,
              "customer_Gender": " ",
              "treatment_Duration": 15,//dynamic
              "fee_Amount": 0,
              "cancellation_Fee_Status": "",
              "cancellation_Policy": " ",
              "probability": 0
  }

