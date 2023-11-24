const { sendResponse } = require('../../../responses/index')
const { db } = require('../../../services/db')
const { nanoid } = require('nanoid')



module.exports.handler = async (event) => {
  //Add userID, products, status (? or status:active by default here )

  const { userID, products, status } = JSON.parse(event.body)
  let totalPrice = 0
  products.forEach(product => {
    totalPrice += product.price
  });
  
  //Add current time
  const timeStamp = Math.floor(new Date().getTime() / 1000)
  //Add id from nanoid
  const orderNr = nanoid()
  const params = {
    TableName: 'ordersDb',
    Item: { 
      orderNr: orderNr,
      userID: userID,
      products: products,
      totalPrice: totalPrice,
      status: status,
      TimeStamp: timeStamp
    }
  }
  //Convert unix timestamp to regular time: 
  const date = new Date(timeStamp * 1000)

  try {
    await db.put(params).promise()
    return sendResponse(200, { sucess: true, message: `Order added at ${date}` })
} catch (error) {
  return sendResponse(500, {success: false, error: error, message: 'Could not add order'})
}};