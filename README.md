# Module Challenge: Node.js Fundamentals

In this challenge we will develop an API to perform CRUD of your tasks. This project is part of the learning process and is not a production-ready application.

## Setup
- Clone the repository;
- Install dependencies (`npm install`);
- Run application (`npm run start`);
- Test it! (I personally recommend testing with [Hoppscotch](https://hoppscotch.io/) or [Bruno API Client](https://www.usebruno.com/)).

## HTTP

### POST `/tasks`

Create a new task.

#### Request body

```json
{
  "title": "New task",
  "description": "Task description"
}
```

### GET `/tasks`

List all tasks.

#### Response body

```json
[
  {
    "id": "2931ec10-4b68-43dd-bd5e-6ac72c2521da",
    "title": "New task",
    "description": "Task description",
    "created_at": "2024-03-03T21:26:54.094Z",
    "updated_at": "2024-03-03T21:26:54.094Z",
    "completed_at": null
  }
]
```

### PUT `/tasks/:id`

Updated a specific task.

#### Request body

```json
{
  "title": "Task updated",
  "description": "Updated task description."
}
```

### DELETE `/tasks/:id`

Delete a task.

### PATCH `/tasks/:id/complete`

Mark task as completed.
