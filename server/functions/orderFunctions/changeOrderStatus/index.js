const { sendResponse } = require('../../../responses/index');
const { db } = require('../../../services/db');

module.exports.handler = async (event) => {
  // Order number and new status sent in the request body
  const { orderNr, userID, newStatus } = JSON.parse(event.body);

  const params = {
    TableName: 'ordersDb',
    Key: {
      orderNr: orderNr,
      userID: userID
    },
    UpdateExpression: 'SET #status = :newStatus',
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':newStatus': newStatus,
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const updatedOrder = await db.update(params).promise();
    return sendResponse(200, { success: true, order: updatedOrder.Attributes });
  } catch (error) {
    return sendResponse(500, { success: false, error: error, message: 'Could not update order status' });
  }
};