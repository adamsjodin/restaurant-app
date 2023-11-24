const { sendResponse } = require('../../../responses/index')
const { db } = require("../../../services/db")


module.exports.handler = async () => {
  //Latest 10 days
  const startTime = Math.floor((Date.now() - 10 * 24 * 60 * 60 * 1000) / 1000)

  //Latest hour - for testing purposes: 
  // const startTime = Math.floor((Date.now() - 1 * 60 * 60 * 1000) / 1000)

  //Now
  const endTime = Math.floor(Date.now() / 1000);;
  
  //Get orders from specified time
  const params = {
    TableName: "ordersDb",
    IndexName: "TimeStampIndex",
    FilterExpression: '#timestamp >= :start AND #timestamp <= :end',
    ExpressionAttributeNames: {
      '#timestamp': 'TimeStamp',
    },
    ExpressionAttributeValues: {
      ':start': startTime,
      ':end': endTime,
    },
  }

  try {
    const result = await db.scan(params).promise();
    return sendResponse(200, { success: true, orders: result.Items });
  } catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
};