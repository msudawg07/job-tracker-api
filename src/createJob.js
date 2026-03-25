// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const job = JSON.parse(event.body);
  const jobId = Date.now().toString();

  const newJob = {
    jobId: jobId,
    title: job.title,
    company: job.company
  };
  const params = {
    TableName: "jobs",
    Item: newJob
  };

  await dynamodb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "createJob Lambda is working!",
      job: job
    })
  }
}