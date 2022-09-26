import React from 'react';

export const Info = ({value, style}) => {

  return (
    <div style={{margin:"auto", width:"50%"}}>
        <div data-testid="remaining" style={getRemainingTextStyle(style.color)}>{value.openedMinutesRemaining} m</div>
        <div style={{textAlign:"center"}}><img data-testid="icon" src={style.icon} width="50%" alt="logo" /></div>
        <div data-testid="extraInfo" style={messageStyle}>{value.extraInfo}</div>
        <div data-testid="msg2" style={messageStyle}>{getClosedElapsInMins(value.closedSince)}</div>
    </div>
  )
};

const getRemainingTextStyle = (color) =>{
    return {
        fontSize: "4rem",
        textAlign:"center",
        color: color
    };
};

const messageStyle = {
    fontSize: "1rem",
    textAlign:"center"
};

const getClosedElapsInMins = (closedSinceTime) => {
  if (!closedSinceTime) return;

  const closedDateTime = new Date();

  const closedTimeMinHour = closedSinceTime.split(':');
  closedDateTime.setHours(closedTimeMinHour[0]);
  closedDateTime.setMinutes(closedTimeMinHour[1]);

  return getMinDiff(new Date(), closedDateTime);
};
  
const getMinDiff = (startDate, endDate) => {
  const msInMinute = 60 * 1000;

  return Math.round(
    Math.abs(endDate - startDate) / msInMinute
  );
};
