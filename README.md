# Job Tracker API

Serverless REST API for managing job applications, built on AWS.

This API allows users to create, update, retrieve, and delete job records using a fully serverless architecture.

---

## Tech Stack

- AWS Lambda (Node.js 22.x)
- API Gateway (HTTP API)
- DynamoDB
- AWS SDK v3

---

## Features

- Create, read, update, and delete job records (full CRUD)
- Input validation and error handling
- RESTful API design with proper status codes
- Serverless deployment using AWS Lambda and API Gateway

---

## Base URL

https://8vcuucp5xb.execute-api.us-east-2.amazonaws.com/default


---

## Endpoints

### Get all jobs

GET /jobs

Example:

```bash
curl https://8vcuucp5xb.execute-api.us-east-2.amazonaws.com/default/jobs
```
Or, you can simply copy and paste the url into your web browser to see the JSON data returned.

---

### Get job by ID

GET /jobs/{id}

Example:

```bash
curl https://8vcuucp5xb.execute-api.us-east-2.amazonaws.com/default/jobs/1774635194717
```

---


## Data Model

Example job object:

```json
{
  "jobId": "1774466248886",
  "title": "Software Engineer",
  "company": "Google",
  "city": "Austin",
  "state": "TX",
  "salary": 120000,
  "applied": true,
  "status": "applied"
}
```

---

## Notes

- `title` and `company` are required fields
- Other fields are optional
- Returns appropriate HTTP status codes:
  - `200` – success
  - `201` – created
  - `400` – bad request
  - `404` – not found
  - `500` – server error
