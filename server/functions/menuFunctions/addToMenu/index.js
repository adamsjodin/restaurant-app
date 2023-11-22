const { sendResponse } = require('../../../responses/index')
const { db } = require('../../../services/db')
const { nanoid } = require('nanoid')


module.exports.handler = async (event) => {
  const item = JSON.parse(event.body)
  //add title, description, price, imgUrl, categories, ingredients and allergens from frontend. 
  try {
    const id = nanoid()
    await db.put({
      TableName: 'menuDb',
      Item: { 
        id: id,
        title: item.title,
        description: item.description,
        price: item.price,
        imgUrl: item.imgUrl,
        categories: item.categories,
        ingredients: item.ingredients,
        allergens: item.allergens
      }
    }).promise()
  return sendResponse(200, { sucess: true, message: `Dish added to menu` })
} catch (error) {
  return sendResponse(500, {success: false, error: error, message: 'Could not add dish'})
}};