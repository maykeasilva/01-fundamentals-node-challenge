import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body

      if (!title) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'Title is required.' })
        )
      }

      if (!description) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'Description is required.' })
        )
      }

      database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      })

      return response.writeHead(201).end()
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { search } = request.query

      const tasks = database.select('tasks', {
        title: search,
        description: search,
      })

      return response.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { title, description } = request.body

      if (!title && !description) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'Title or description is required.' })
        )
      }

      const [ task ] = database.select('tasks', { id })

      if (!task) {
        return response.writeHead(404).end(
          JSON.stringify({ message: 'Task does not exist.' })
        )
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      })

      return response.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params
      const [ task ] = database.select('tasks', { id })

      if (!task) {
        return response.writeHead(404).end(
          JSON.stringify({ message: 'Task does not exist.' })
        )
      }

      const isTaskCompleted = !!task.completed_at
      const completed_at = isTaskCompleted ? null : new Date()

      database.update('tasks', id, { completed_at })
      return response.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const [ task ] = database.select('tasks', { id })

      if (!task) {
        return response.writeHead(404).end(
          JSON.stringify({ message: 'Task does not exist.' })
        )
      }
      
      database.delete('tasks', id)
      return response.writeHead(204).end()
    },
  },
]
