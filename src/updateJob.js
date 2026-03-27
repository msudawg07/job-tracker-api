const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  const jobId = event.pathParameters.id;
  const body = JSON.parse(event.body);

  const updatedJob = {
    jobId: jobId,
    title: body.title,
    company: body.company
  }

  const params = {
    TableName: "jobs",
    Item: updatedJob
  };

  await dynamodb.send(new PutCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Job successfully updated",
      updatedJob: updatedJob
    })
  }
}