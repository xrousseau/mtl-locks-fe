import noaccess from './icon-stop.svg';
import access from './icon-go.svg';
import attention from './icon-attention.svg'

const colors = {BLUE: '#3e98c7', RED: '#cc0000', ORANGE: '#f86304'};

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

export {colors, getStyle };