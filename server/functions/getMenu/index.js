const { sendResponse } = require('../../responses/index')
const { db } = require("../../services/db")

module.exports.handler = async (event, context) => {
  try {
    const { items } = await db.scan({
      TableName: "menuDb",
      FilterExpression: "attribute_exists(#DYNOBASE_menu)",
      ExpressionAttributeNames: {
        "#DYNOBASE_menu": "menu"
      }
    }).promise();
    return sendResponse(200, { success: true, menu: items });
  } catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
  
};
