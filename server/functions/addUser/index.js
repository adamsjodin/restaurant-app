const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')
const { nanoid } = require('nanoid')


module.exports.handler = async (event) => {
  const item = JSON.parse(event.body)

  try {
    const id = nanoid()
    await db.put({
      TableName: 'usersDb',
      Item: { 
        id: id,
        role: item.role,
        email: item.email,
        password: item.password,
        adress: item.adress
      }
    }).promise()
  return sendResponse(200, { sucess: true, message: `User added` })
} catch (error) {
  return sendResponse(500, {success: false, error: error, message: 'Could not add user'})
}};