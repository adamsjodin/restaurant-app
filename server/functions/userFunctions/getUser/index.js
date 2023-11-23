const { sendResponse } = require('../../../responses/index')
const { db } = require("../../../services/db")
const bcrypt = require('bcryptjs')

module.exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body)
  const params = {
    TableName: "userDb",
    Key: {
      email: email
    }
  }
  try {
    const result = await db.get(params).promise();
    if (result.Item && bcrypt.compareSync(password, result.Item.password)) {
      //Return info about user to save locally
      return sendResponse(200, { success: true, message: "Found user", body: JSON.stringify({
        id: result.Item.id,
        role: result.Item.role,
        name: result.Item.name,
        adress: result.Item.adress,
        email: result.Item.email
      }) 
    });
  } else {
    return sendResponse(401, {message: "Wrong input"})
  }}
  catch (error) {
    return sendResponse(501, { error: error, message: "Somehing went wrong" })
  }
};