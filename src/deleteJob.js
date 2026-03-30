const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  if(!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Job id is required"
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

  let existing;
  try {
    existing = await dynamodb.send(new GetCommand(params));
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error"
      })
    }
  }

  if (!existing.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Job not found"
      })
    };
  }

  try {
    await dynamodb.send(new DeleteCommand(params))
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error"
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${existing.Item.title} at ${existing.Item.company} successfully deleted.`
    })
  }
}