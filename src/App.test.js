import { render, screen } from '@testing-library/react';
import App from './App';
import * as utility from './utility';

test('toto for closed status', () => {
  //render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
  const status = statusIsClosed();
  const styleReturned = utility.getStyle(status);
  const styleExpect = { icon: 'icon-stop.svg', color: '#cc0000' }
  expect(styleReturned).toEqual(styleExpect);
});

// is closed
const statusIsClosed = () => {

  const timeNow = new Date();
  const timeClosed = new Date();
  timeClosed.setMinutes(timeClosed.getMinutes() - 5);
  const timeClosedString = timeClosed.getHours() + ":" + timeClosed.getMinutes()

  return {
    etag: `W/"datetime'2022-09-23T14%3A43%3A00.2548165Z'"`,
    extraInfo: `Fully Raised since ${timeClosedString}`,
    isOpened: false,
    closedSince: timeClosedString,
    openedMinutesRemaining: 0,
    partitionKey: 'M1',
    passageName: 'Victoria Bridge Upstream (Cycling Path)',
    rowKey: getRowKey(timeNow),
    timestamp: timeNow.toDateString()
  };

}

// Is opened with no expected closed time
const isStatusNoETAOpened = {
  etag: `W/"datetime'2022-09-23T14%3A43%3A00.2548165Z'"`,
  extraInfo: 'Raising',
  isOpened: false,
  openedMinutesRemaining: 0,
  partitionKey: 'M1',
  passageName: 'Victoria Bridge Upstream (Cycling Path)',
  rowKey: '79779076855740',
  timestamp: '9/23/2022, 10:43:00 AM'
}

// Is opened with an expected closed time
const isStatusETAOpened = {
  etag: `W/"datetime'2022-09-23T14%3A43%3A00.2548165Z'"`,
  extraInfo: 'Raising',
  isOpened: false,
  openedMinutesRemaining: 0,
  partitionKey: 'M1',
  passageName: 'Victoria Bridge Upstream (Cycling Path)',
  rowKey: '79779076855740',
  timestamp: '9/23/2022, 10:43:00 AM'
}

const getRowKey = (dateTime) => {
  return (99999999999999 - convertToYYYYMMDDHHMMSS(dateTime)).toString();
}

const convertToYYYYMMDDHHMMSS = (date = new Date()) => {
  const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0');
  }
  
  return parseInt([      
      date.getUTCFullYear(),
      padTo2Digits(date.getUTCMonth() + 1),
      padTo2Digits(date.getUTCDate()),
      padTo2Digits(date.getUTCHours()),
      padTo2Digits(date.getUTCMinutes()),
      padTo2Digits(date.getUTCSeconds())
  ].join(''));
};