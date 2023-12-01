const { sendResponse } = require('../../../responses/index');
const { db } = require('../../../services/db');

module.exports.handler = async (event) => {
  // Id and new status sent in the request body
  const { id, newValue } = JSON.parse(event.body);

  const params = {
    TableName: 'menuDb',
    Key: {
      id: id
    },
    UpdateExpression: 'SET #price = :newValue',
    ExpressionAttributeNames: {
      '#price': 'price',
    },
    ExpressionAttributeValues: {
      ':newValue': newValue,
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const updateMenu = await db.update(params).promise();
    return sendResponse(200, { success: true, menu: updateMenu.Attributes });
  } catch (error) {
    return sendResponse(500, { success: false, error: error, message: 'Could not update menu' });
  }
};