const { sendResponse } = require('../../../responses/index');
const { db } = require('../../../services/db');
  
module.exports.handler = async (event) => {
  const { id } = JSON.parse(event.body)
  
  try {
    await db.delete({
      TableName: "menuDb",
      Key: { id: id },
      
    }).promise();
    return sendResponse(200, { success: true, message: "Dish deleted" });
  } catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
}