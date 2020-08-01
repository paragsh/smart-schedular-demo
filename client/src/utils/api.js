import axios from 'axios';
import {getAppointmentData} from "./GetAppointmentData";
import moment from 'moment';

export function fetchAppointmentList(selectedDate) {
    var formattedDate = moment(selectedDate).format('DD/MM/YYYY');
    // return Promise.resolve(getAppointmentData);
    return axios({
        method: 'get',
        baseURL:'https://smarter.azurewebsites.net',
        url: '/api/appointment/GetAppointments',
        params: {
            'date' : formattedDate
        },
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Credentials':'true'},
    }).then(data => data.data);
}

export function fetchWaitListConfirmation(noshowProbability) {

    return axios({
        method: 'get',
        baseURL:'https://smarter.azurewebsites.net',
        url: '/api/appointment/waitlist',
        params: {
            'noShowProbabilities' : noshowProbability
        },
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Credentials':'true'},
    }).then(data => data.data);
}

export function SaveAppointment(formPayload) {
    const startDate = moment(formPayload.bookingFullTIme).format('YYYY-MM-DD HH:mm:ss');
    const savePayload={
        "id": 0,
        "location_Id": 3510,
        "business_Type": "Spa",
        "business_Type_Id": 30,
        "state": "QC",
        "country": "Canada",
        "treatment_Id": formPayload.selectedTreatmentId, //dynamic
        "treatment_Name": "",//can be null
        "billable_Item_Id": 1800930,//anything
        "employee_Id": formPayload.selectedStaffId,//dynamic
        "employee_Name": formPayload.selectedStaffName,//can be null
        "status": " ",//can be null
        "booked_Date": "2020-08-03T09:15:00",//any date cannot be null
        "start_Date": startDate,//selected date
        "end_Date": "2020-08-03T09:15:00",//any date cannot be null
        "cancellation_Type": "",//can be null
        "customer_Id": formPayload.selectedCustomerId,//dynamic
        "customer_Name": " ",
        "customer_Age": 0,
        "customer_Gender": " ",
        "treatment_Duration": formPayload.treatmentDuration,//dynamic
        "fee_Amount": 0,
        "cancellation_Fee_Status": "",
        "cancellation_Policy": " ",
        "probability": 0
    };

    return axios({
        method: 'post',
        baseURL:'https://smarter.azurewebsites.net',
        url: '/api/appointment/CreateAppoitment',
        data: savePayload,
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Credentials':'true'},
    }).then(data => console.log(data));
}


export function predictAppointment(formPayload) {
    const startDate = moment(formPayload.bookingFullTIme).format('YYYY-MM-DD HH:mm:ss');
    const predictPayload = {
        "appointments": [
            {
                "id": 7094080,
                "location_Id": 3510,
                "business_Type": "Spa",
                "business_Type_Id": 30,
                "state": "QC",
                "country": "Canada",
                "treatment_Id": formPayload.selectedTreatmentId,
                "treatment_Name": "Oyster Shell Powder Scrub",
                "billable_Item_Id": 1800929,
                "employee_Id": formPayload.selectedStaffId,
                "employee_Name": formPayload.selectedStaffName,
                "status": "BOOKED",
                "booked_Date": "2020-07-31T14:44:41",
                "start_Date": startDate,
                "end_Date": "2020-08-04T09:45:00",
                "cancellation_Type": "",
                "customer_Id": formPayload.selectedCustomerId,
                "customer_Name": "Pankaj Y Thakare",
                "customer_Age": 30,
                "customer_Gender": "Male",
                "treatment_Duration": formPayload.treatmentDuration,
                "fee_Amount": 0,
                "cancellation_Fee_Status": "",
                "cancellation_Policy": "YES",
                "probability": 0,
            }
        ]
    };

    return axios({
        method: 'post',
        baseURL:'https://smarter-model.azurewebsites.net',
        url: '/api/NoShow/Predict',
        data: predictPayload,
        headers: {'Accept': 'application/json', 'Content-Type' : 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Credentials':'true'},
    }).then(data => data.data);
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
  };

