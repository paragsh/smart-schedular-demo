import {newBooking} from "./Data";
import {GREEN, ORANGE, RED} from "../Constant/color";

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

export function getColor(probablity) {
        probablity = Math.random()*100;
      if (probablity > 80) {
          return RED;
      } else if (probablity<= 80 && probablity>60) {
          return ORANGE;
      }
      return GREEN;

}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
