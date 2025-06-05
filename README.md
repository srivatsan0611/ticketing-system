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

## API Endpoints


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