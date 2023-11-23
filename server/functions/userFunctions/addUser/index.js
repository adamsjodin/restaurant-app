const { sendResponse } = require('../../../responses/index')
const { db } = require('../../../services/db')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')


module.exports.handler = async (event) => {
  //Add email, role (default: member), name, password, adress
  const { email, role, name, password, adress } = JSON.parse(event.body)
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
      adress: adress
    }
  }
  try {
    await db.put(params).promise()
    return sendResponse(200, { sucess: true, message: `User added` })
} catch (error) {
  return sendResponse(500, {success: false, error: error, message: 'Could not add user'})
}};