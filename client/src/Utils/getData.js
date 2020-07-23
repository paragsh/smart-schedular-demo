import {booking} from "./mockData";
import moment from 'moment';


export function getResources() {
    const employeeNameList = booking.map(op => op.employeeName);
    const uniqueEmployeeNameList = [...new Set(employeeNameList)];
    const resource = [{
        id: 'base',
        name: 'Staff',
        groupOnly: true
    }];
    uniqueEmployeeNameList.forEach((list, index) => {
        const temp = {id:list, name: list};
        resource.push(temp);
    });
    return resource;
}

export function getEvents() {
    let updatedBookingList = booking.map((op) =>
        {
            let time = new Date(op.startDateTime);
            let start = moment(time ).format("YYYY-MM-DD hh:mm:ss");
            // let start = time.toLocaleDateString() + ' ' +time.toLocaleTimeString();
            time.setMinutes(time.getMinutes() + (op.treatmentDuration));
            let end = moment(time ).format("YYYY-MM-DD hh:mm:ss");
            return {
                id: op.appointmentID,
                start: start,
                end: end,
                // resizable: false,
                resourceId: op.employeeName,
                title: op.customerName + ' - ' + op.appointmentStatus,
                // movabable: false,
                bgColor: '#f759ab'
            }
        }

    );

    updatedBookingList.sort(function(a, b) {
        return +new Date(a.start) - (+new Date(b.start));
    });
    return updatedBookingList;
}
