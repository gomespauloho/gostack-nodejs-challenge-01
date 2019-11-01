const express = require('express')

const server = express()
server.use(express.json())

const projects = []
let count = 0

function getErrorMessage(res, errors) {
  return res.status(400).json({ errors })
}

function verifyProperty(body, propName) {
  const prop = body[propName]

  if (!prop) {
    return `Property "${propName}" is required`
  }

  if (typeof(prop) != 'string') {
    return `Property type "${propName}" must be string`
  }
}

function verifyProperties(body, properties) {
  const errors = []
  
  properties.forEach(prop => {
    const error = verifyProperty(body, prop)

    if (error) {
      errors.push(error)
    }
  });

  return errors
}

function countRequisition(req, res, next) {
  count++

  next()

  console.log(`Requisition(s): ${count}`)
}

function verifyAllProjectProperties(req, res, next) {
  const errors = verifyProperties(req.body, ['id', 'title'])

  if (errors.length > 0)
    return getErrorMessage(res, errors)

  next()
}

function verifyTitleProperty(req, res, next) {
  const errors = verifyProperties(req.body, ['title'])

  if (errors.length > 0)
    return getErrorMessage(res, errors)

  next()
}

function verifyIfProjectExists(req, res, next) {
  const { id } = req.params

  if (!id)
    return getErrorMessage(res, ['Parameter id is required'])

  const index = projects.findIndex(item => item.id === id)

  if (index === -1) 
    return getErrorMessage(res, [`Project does not exists`])

  req.projectIndex = index
  
  next()
}

server.post('/projects', countRequisition, verifyAllProjectProperties, (req, res) => {
  const { id, title } = req.body

  projects.push({
    id, title, tasks: []
  })

  return res.json(projects)
})

server.put('/projects/:id', countRequisition, verifyIfProjectExists, verifyTitleProperty, (req, res) => {
  const { title } = req.body

  projects[req.projectIndex].title = title

  return res.json(projects[req.projectIndex])
})

server.put('/projects/:id/tasks', countRequisition, verifyIfProjectExists, verifyTitleProperty, (req, res) => {
  const { title } = req.body

  projects[req.projectIndex].tasks.push(title)

  return res.json(projects[req.projectIndex])
})

server.delete('/projects/:id', countRequisition, verifyIfProjectExists, (req, res) => {
  projects.splice(req.projectIndex, 1)

  return res.send()
})

server.get('/projects', countRequisition, (req, res) => {
  return res.json(projects)
})

server.listen(3000)