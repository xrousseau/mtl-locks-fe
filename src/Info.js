import React from 'react';

export const Info = ({value, style}) => {

  return (
    <div style={{margin:"auto", width:"50%"}}>
        <div data-testid="remaining" style={getRemainingTextStyle(style.color)}>{value.openedMinutesRemaining} m</div>
        <div style={{textAlign:"center"}}><img data-testid="icon" src={style.icon} width="50%" alt="logo" /></div>
        <div data-testid="extraInfo" style={messageStyle}>{value.extraInfo}</div>
    </div>
  )
};

const getRemainingTextStyle = (color) =>{
    return {
        fontSize: "4.25rem",
        textAlign:"center",
        fontWeight:"bold",
        color: color
    };
};

const messageStyle = {
    fontSize: "2rem",
    textAlign:"center"
};


