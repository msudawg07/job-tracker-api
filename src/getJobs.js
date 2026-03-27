const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  const params = {
    TableName: "jobs"
  }

  let result;

  try {
    result = await dynamodb.send(new ScanCommand(params));
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Server error - ${error.message}`
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      jobs: result.Items || []
    })
  }
}