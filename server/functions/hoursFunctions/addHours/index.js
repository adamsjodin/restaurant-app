const { sendResponse } = require('../../../responses/index')
const { db } = require('../../../services/db')
const { nanoid } = require('nanoid')

exports.handler = async (event) => {
    const hours = JSON.parse(event.body);

    try {
        const id = nanoid();
        await db.put({
            TableName: 'hoursDb',
            Item: {
                id: id,
                days: hours.day,
                openHours: hours.open,
                closingHours: hours.close,
                notes: hours.note
            }
        }).promise();

        return sendResponse(200, { success: true, message: 'Hours added to DB' });
    } catch (error) {
        console.error(error);
        return sendResponse(500, { success: false, message: ' Could not add hours added to DB', error });
    };
};