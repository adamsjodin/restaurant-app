const { sendResponse } = require('../../../responses/index')
const { db } = require("../../../services/db")

module.exports.handler = async (event) => {
  const { userID } = JSON.parse(event.body)
  const params = {
    TableName: "userDb",
    FilterExpression: '#id = :userID',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':userID': userID
    },
  }
  try {
    const result = await db.scan(params).promise();
    if(result.Items.length > 0) {
      return sendResponse(200, { success: true, message: "Found user", body: {
        name: result.Items[0].name,
        phone: result.Items[0].phone,
        email: result.Items[0].email
      }
    })} else {
      return sendResponse(404, { success: false, message: 'User not found' })
    }
  }
  catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
};