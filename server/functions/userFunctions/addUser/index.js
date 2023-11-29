const { sendResponse } = require('../../../responses/index')
const { db } = require('../../../services/db')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')


module.exports.handler = async (event) => {
  //Add email, role (default: member), name, password, phone
  const { email, role, name, password, phone } = JSON.parse(event.body)
  try {
    const existingUser = await db.get({
      TableName: 'userDb',
      Key: {
        email: email,
      },
    }).promise();

    if (existingUser.Item) {
      // User with the given email already exists
      return sendResponse(400, { success: false, message: 'User with this email already exists' });
    }
  } catch (error) {
    return sendResponse(500, { success: false, error: error, message: 'Error checking existing user' });
  }
  
  //Hash password
  const hashedPassword = bcrypt.hashSync(password, 10)
  //Add id from nanoid
  const id = nanoid()
  const params = {
    TableName: 'userDb',
    Item: { 
      email: email,
      role: role,
      id: id,
      name: name,
      password: hashedPassword,
      phone: phone
    }
  }
  try {
    await db.put(params).promise()
    return sendResponse(200, { sucess: true, message: `User added` })
} catch (error) {
  return sendResponse(500, {success: false, error: error, message: 'Could not add user'})
}};