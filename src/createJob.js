const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

  if(!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Request body is empty."
      })
    }
  }

  const jobId = Date.now().toString();
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

  const newJob = {
    jobId: jobId,
    title: body.title,
    company: body.company,
    salary: body.salary,
    city: body.city,
    state: body.state,
    applied: body.applied,
    status: body.status
  };
  const params = {
    TableName: "jobs",
    Item: newJob
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
    statusCode: 201,
    body: JSON.stringify({
      message: "New job added successfully",
      job: newJob
    })
  }
}