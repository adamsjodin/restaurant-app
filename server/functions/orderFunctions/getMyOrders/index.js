const { sendResponse } = require('../../../responses/index')
const { db } = require("../../../services/db")

//Code from getUser - not fixed
module.exports.handler = async (event) => {
  const { userID } = JSON.parse(event.body)
  const params = {
    TableName: "ordersDb",
    FilterExpression: 'userID = :userID',
    ExpressionAttributeValues: {
      ':userID': userID
    }

  }
  try {
    const { Items } = await db.scan(params).promise();
    return sendResponse(200, { success: true, message: "Found history", orders: Items })}
  catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
};