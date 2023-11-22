const { sendResponse } = require('../../../responses/index')
const { db } = require("../../../services/db")


module.exports.handler = async (event, context) => {
  //Get all orders
  try {
    const { Items } = await db.scan({TableName: "ordersDb"}).promise();
    return sendResponse(200, { success: true, allOrders: Items });
  } catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
};