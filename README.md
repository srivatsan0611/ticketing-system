# Ticketing System 

### A simple backend system for managing support tickets. Built with Express.js and SQLite.


## Setup

1. Clone the Repo

```
git clone
```

2. Install the dependencies

```
npm install
```

3. Run the backend service

```
node ticketing-system/index.js
```

## API Endpoints - The Basic Features Implemented


1. Creating a Ticket

POST /api/tickets

```
{
  "title": "Login not working",
  "description": "Unable to login since yesterday",
  "status": "open",                
  "createdBy": 1                   
}

```
2. Get All Tickets

GET/ /api/tickets



- Query params (optional):

    status=open|in_progress|closed

    createdBy=1 (Filter by user ID)

Example :

```
GET /api/tickets?status=open&createdBy=1
```

3. Get Ticket By ID


```
GET /api/tickets/:id
```

4. Update a Ticket

PATCH api/tickets/:id 

```
{
  "status": "in_progress",
  "description": "Now looking into it"
}
```

5. Delete a Ticket


DELETE /api/tickets/:id



6. Assign a Ticket to a Support Engineer

PATCH /api/tickets/:id/assign

```

{
  "assignedTo": 2     // Must be a support engineer (Check Included)
}

```

## Bonus Features

1. UI - HTML/CSS/JS
   Incredibly Basic UI using a simple flow for example: OnClick() -> getTicket() 
  ![image](https://github.com/user-attachments/assets/9a4e4059-b8c7-48b6-98ac-a2d15b7ecb09)

2. Ticket Comments

   - Attempted -> Not functional yet.
   - Created a "comments" table in the Schema - Referencing the initial Tickets table as a Foreign Key
   - Wrote the API endpoints and routers separately for the same.

3. Dockerization

Key entities -> Dockerfile, .dockerignore
  - Use the Dockerfile Config mentioned to build a docker image using the command 
  ```
  docker build -t ticketing-system .
  ```

  - After you've built the image, create an isolated running instance of the application using the command

  ```
  docker run -p 5000:5000 ticketing-system
  ```
  The API will now be accessible at ``` http://localhost:5000/api/tickets ```



Thank you for your time and consideration!





