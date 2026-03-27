const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const jobId = event.pathParameters.id;
  // const job = // will have to grab this from the db for including in message

  const params = {
    TableName: "jobs",
    Key: {
      jobId: jobId
    }
  };

  await dynamodb.send(new DeleteCommand(params))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Job successfully deleted.`
    })
  }
}