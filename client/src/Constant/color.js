import purple from '@material-ui/core/colors/purple';

const RED =  "#FFD0D0";
const LIGHT_RED =  "#FFF2F2";
const ORANGE =  "#FFE7A5";
const LIGHT_ORANGE =  "#FFF8E5";
const LIGHT_GREEN =  "#E5F4DE";
const GREEN =  "#B4E8B8";
export const PURPLE =  purple[50];


const RED_BORDER =  "#FF4D4D";
const LIGHT_RED_BORDER =  "#FFAAAA";
const ORANGE_BORDER =  "#FF8800";
const LIGHT_ORANGE_BORDER =  "#FFC563";
const LIGHT_GREEN_BORDER =  "#4BA151BF";
const GREEN_BORDER =  "#006F0794";
const DARK_PURPLE =  purple[900];


export function getProbabilityMeterColor(probability) {
    if (probability > 80) {
        return RED;
    } else if (probability<= 80 && probability>60) {
        return LIGHT_RED;
    } else if (probability<= 60 && probability>40) {
        return ORANGE;
    } else if (probability<= 40 && probability>20) {
        return LIGHT_ORANGE;
    }else if (probability<= 20 && probability>10) {
        return LIGHT_GREEN;
    }
    return GREEN;

}

export function getBorderColor(bgColor) {
    let borderColor;
    switch (bgColor) {
        case RED : borderColor =  RED_BORDER; break;
        case LIGHT_RED : borderColor =  LIGHT_RED_BORDER; break;
        case ORANGE : borderColor =  ORANGE_BORDER; break;
        case LIGHT_ORANGE : borderColor =  LIGHT_ORANGE_BORDER; break;
        case LIGHT_GREEN : borderColor =  LIGHT_GREEN_BORDER; break;
        case GREEN : borderColor =  GREEN_BORDER; break;
        default: borderColor = DARK_PURPLE;
    }
    return borderColor;
}

