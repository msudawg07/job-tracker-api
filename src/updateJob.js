const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

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

  const result = await dynamodb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Job successfully updated",
      updatedJob: updatedJob
    })
  }
}