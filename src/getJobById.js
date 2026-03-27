const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  if(!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "job id required"
      })
    }
  }
  const jobId = event.pathParameters.id;

  const params = {
    TableName: "jobs",
    Key: {
      jobId: jobId
    }
  };

  let result;
  try {
    result = await dynamodb.send(new GetCommand(params));
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error"
      })
    }
  }

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Job not found"
      })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      job: result.Item
    })
  }
}