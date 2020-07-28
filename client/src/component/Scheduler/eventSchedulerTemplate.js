import {getBorderColor} from "../../Constant/color";
import React from "react";

export const eventSchedulerTemplate = (isStart, bgColor, schedulerData, event, mustBeHeight, agendaMaxEventWidth, mustAddCssClass) => {
    let borderWidth = isStart ? '4' : '0';
    let backgroundColor = bgColor;
    let borderColor = getBorderColor(bgColor);
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    let divStyle = {
        borderLeft: borderWidth + 'px solid ' + borderColor,
        backgroundColor: backgroundColor,
        height: mustBeHeight
    };
    if (!!agendaMaxEventWidth)
        divStyle = {...divStyle, maxWidth: agendaMaxEventWidth};

    return <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px`}}>{titleText}</span>
    </div>;
}
