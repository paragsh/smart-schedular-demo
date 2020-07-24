import {newBooking} from "./Data";
import moment from 'moment';


export function getResources() {
    const employeeNameList = newBooking.map(op => op.employeeName);
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
    return newBooking.map((op) => {
            return {
                id: op.appointment_ID,
                start: op.appointment_Start_Date,
                end: op.appointment_End_Time,
                // resizable: false,
                resourceId: op.employeeName,
                title: op.customer_Name + ' - ' + op.appointment_Status,
                // movabable: false,
                bgColor: getColor(op.probablity)
            }
        }
    );
}

function getColor() {
        let number = Math.random() * 100;
        let r, g, b;
        if (number < 50) {
            // green to yellow
            r = Math.floor(255 * (number / 50));
            g = 200;

        } else {
            // yellow to red
            r = 200;
            g = Math.floor(255 * ((50-number%50) / 50));
        }
        b = 0;

        return  "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
