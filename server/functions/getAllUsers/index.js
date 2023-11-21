const { sendResponse } = require('../../responses/index')
const { db } = require("../../services/db")

module.exports.handler = async (event, context) => {
  try {
    const { Items } = await db.scan({
      TableName: "usersDb",
      FilterExpression: "attribute_exists(#DYNOBASE_id)",
      ExpressionAttributeNames: {
        "#DYNOBASE_id": "id"
      }
    }).promise();
    return sendResponse(200, { success: true, message: "Found function", menu: Items });
  } catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
  
};