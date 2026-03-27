const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  const params = {
    TableName: "jobs"
  }

  const jobs = await dynamodb.send(new ScanCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify({
      jobs: jobs.Items || []
    })
  }
}