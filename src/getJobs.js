const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

  const params = {
    TableName: "jobs"
  }

  const jobs = await dynamodb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      jobs: jobs.Items
    })
  }
}