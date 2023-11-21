const { sendResponse } = require('../../responses/index')
const { db } = require("../../services/db")

module.exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body)
  try {
    const { Items } = await db.scan({
      TableName: "userDb",
      Key: { userId: userId },
      FilterExpression: "attribute_exists(#DYNOBASE_userId)",
      ExpressionAttributeNames: {
        "#DYNOBASE_userId": "userId"
      }
    }).promise();
    return sendResponse(200, { success: true, message: "Found function", menu: Items });
  } catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
  
};