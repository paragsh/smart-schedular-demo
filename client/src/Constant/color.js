import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import purple from '@material-ui/core/colors/purple';

export const RED =  red[50];
export const ORANGE =  amber[50];
export const GREEN =  green[50];
export const PURPLE =  purple[50];


export const DARK_RED =  red[900];
export const DARK_ORANGE =  amber[900];
export const DARK_GREEN =  green[900];
export const DARK_PURPLE =  purple[900];


export function getProbabilityMeterColor(probablity) {
    probablity = Math.random()*100;
    if (probablity > 80) {
        return RED;
    } else if (probablity<= 80 && probablity>60) {
        return ORANGE;
    }
    return GREEN;

}

export function getBorderColor(bgColor) {
    let borderColor = DARK_PURPLE;
    if (bgColor === RED) {
        borderColor = DARK_RED;
    } else if (bgColor === ORANGE) {
        borderColor = DARK_ORANGE;
    } else if (bgColor === GREEN) {
        borderColor = DARK_GREEN;
    }
    return borderColor;
}

