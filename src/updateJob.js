const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  if(!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Request body is empty"
      })
    }
  }

  if(!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Job id is required"
      })
    }
  }

  let body;

  try {
    body = JSON.parse(event.body);
  }
  catch (error){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Invalid JSON in request body. - ${error.message}`
      })
    }
  }

  if(!body.title || !body.company) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "title and company are required."
      })
    }
  }

  const jobId = event.pathParameters.id;

  const getParams = {
    TableName: "jobs",
    Key: { jobId }
  };

  let existing;
  try {
    existing = await dynamodb.send(new GetCommand(getParams));
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

  const updatedJob = {
    jobId: jobId,
    title: body.title,
    company: body.company,
    salary: body.salary,
    city: body.city,
    state: body.state,
    applied: body.applied,
    status: body.status
  }

  const params = {
    TableName: "jobs",
    Item: updatedJob
  };

  try {
    await dynamodb.send(new PutCommand(params));
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
      message: "Job successfully updated",
      job: updatedJob
    })
  }
}