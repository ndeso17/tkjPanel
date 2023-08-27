const response = (statusCode, data, message, res) => {
  res.json(statusCode, [
    {
      statusCode: statusCode,
      message: message,
      payload: {
        datas: data,
      },
    },
  ]);
};
module.exports = response;
