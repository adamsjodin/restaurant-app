const { sendResponse } = require('../../../responses/index');
const { db } = require('../../../services/db');

module.exports.handler = async (event) => {
  // Id and new status sent in the request body
  // const { id, price, title, outOfOrder } = JSON.parse(event.body);
  const { id, ...updateAttributes } = JSON.parse(event.body);

  const updateExpressionParts = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  Object.entries(updateAttributes).forEach(([key, value]) => {
    const attributePlaceholder = `#${key}`;
    const attributeValuePlaceholder = `:${key}`;

    updateExpressionParts.push(`${attributePlaceholder} = ${attributeValuePlaceholder}`);
    expressionAttributeNames[attributePlaceholder] = key;
    expressionAttributeValues[attributeValuePlaceholder] = value;
  });
  
  const updateExpression = 'SET ' + updateExpressionParts.join(', ');


  const params = {
    TableName: 'menuDb',
    Key: {
      id: id
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };

  try {
    const updateMenu = await db.update(params).promise();
    return sendResponse(200, { success: true, menu: updateMenu.Attributes });
  } catch (error) {
    return sendResponse(500, { success: false, error: error, message: 'Could not update menu' });
  }
};