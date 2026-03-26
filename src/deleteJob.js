const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const jobId = event.pathParameters.id;
  // const job = // will have to grab this from the db for including in message

  const params = {
    TableName: "jobs",
    Key: {
      jobId: jobId
    }
  };

  await dynamodb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Job successfully deleted.`
    })
  }
}