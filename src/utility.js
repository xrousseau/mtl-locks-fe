import noaccess from './icon-stop.svg';
import access from './icon-go.svg';
import attention from './icon-attention.svg'

const colors = {BLUE: '#3e98c7', RED: '#cc0000', ORANGE: '#fcc005'};

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

// Used for control styling according to status
const getStyle = (status) => {
  // default blue
  const style = {
    icon : access,
    color : colors.BLUE
  }
  // closed (red)
  if (!status.isOpened) {
    style.icon = noaccess;
    style.color = colors.RED
  }
  // expected to close
  else if (status.expectedNextClosure != null | status.extraInfo === 'Raising Soon') {
    style.icon = attention;
    style.color = colors.ORANGE
  }  
  return style;
}

 const getMessage = (status) => {

  let msg = 'All good 👍 No boats in sight for the next hour.';

  if (status.extraInfo === 'Lowering') msg = "The bridge is lowering ↓";
  else if (status.extraInfo === 'Raising') msg = "The bridge is currently raising ↑";
  else if (status.extraInfo === 'Raising Soon') msg = "The bridge is raising very soon ⚠️";
  else if (!status.isOpened) msg = `The bridge has been close for the last ${getClosedElapsInMins(status.closedSince)} minutes 😓`
  else if (status.expectedNextClosure != null | status.extraInfo === 'Raising Soon') msg = 'A boat is coming ... ⛵️';

  return msg;
};

export {colors, getStyle, getMessage };