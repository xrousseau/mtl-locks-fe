// supporting data
const passageName = 'Victoria Bridge Upstream (Cycling Path)';
const partitionKey = 'M1';

// emulates row key generated from the scraper app
const getRowKey = (dateTime) => {
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

    return (99999999999999 - convertToYYYYMMDDHHMMSS(dateTime)).toString();
}

export const closed = () => {

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
        partitionKey: partitionKey,
        passageName: passageName,
        rowKey: getRowKey(timeNow),
        timestamp: timeNow.toDateString()
};

}

export const openedWithNOExpectedNextClosure = () => {

    const timeNow = new Date();

    return {
        etag: `W/"datetime'2022-09-23T14%3A43%3A00.2548165Z'"`,
        expectedNextClosure : null,
        extraInfo: null,
        isOpened: true,
        openedMinutesRemaining: 60,
        partitionKey: partitionKey,
        passageName: passageName,
        rowKey: getRowKey(timeNow),
        timestamp: timeNow.toDateString()
    };

}

export const openedWithAnExpectedNextClosure = () => {

    const timeNow = new Date();
    const timeClosed = new Date();
    timeClosed.setMinutes(timeClosed.getMinutes() + 10);
    const timeClosedString = timeClosed.getHours() + ":" + timeClosed.getMinutes()

    return {
        etag: `W/"datetime'2022-09-23T14%3A43%3A00.2548165Z'"`,
        expectedNextClosure : timeClosedString,
        extraInfo: null,
        isOpened: true,
        openedMinutesRemaining: 10,
        partitionKey: partitionKey,
        passageName: passageName,
        rowKey: getRowKey(timeNow),
        timestamp: timeNow.toDateString()
    };
}