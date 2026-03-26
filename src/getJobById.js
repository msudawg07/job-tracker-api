const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

  const jobId = event.pathParameters.id;

  const params = {
    TableName: "jobs",
    Key: {
      jobId: jobId
    }
  };

  const result = await dynamodb.get(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      job: result.Items
    })
  }
}