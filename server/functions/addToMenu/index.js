const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')


module.exports.handler = async (event, context) => {
  const { item } = JSON.parse(event.body)

  try {
    await db.put({
      TableName: 'menuDb',
      Item: { item }
    }).promise()
  return sendResponse(200, { sucess: true, message: `Dish added to menu` })
} catch (error) {
  return sendResponse(500, {success: false, error: error, message: 'Could not add dish'})
}};