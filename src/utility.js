import noaccess from './icon-stop.svg';
import access from './icon-go.svg';
import attention from './icon-attention.svg'

export const getStyle = (status) => {
    // default green
    const style = {
      icon : access,
      color : '#3e98c7'
    }
    // closed (red)
    if (!status.isOpened) {
      style.icon = noaccess;
      style.color = "#cc0000"
    }
    // expected to close (yellow)
    else if (status.expectedNextClosure != null | status.extraInfo === 'Raising Soon') {
      style.icon = attention;
      style.color = "#f86304"
    }
  

  
    return style;
} 