module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Function to get menu',
        input: event,
      },
      null,
      2
    ),
  };
};
