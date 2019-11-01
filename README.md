# Challenge 01 - nodeJS
Projects API

## Execution

### Resolve dependences
```bash
yarn
```

### Execute the project
```
yarn dev
```

## API

### Routes

- /projects
- /projects/:id
- /projects/:id/tasks

### Definitions
- GET all projects
  - Return an array of projects
  - Url example: http://localhost:3000/projects
- GET specific project
  - The id project is required in route parameters
  - Returns a project
  - Url example: http://localhost:3000/projects/10
- POST
  - Create project
  - Returns an array of projects
  - The properties ```id``` and ```title``` is required
  - Url example: http://localhost:3000/projects
- PUT
  - Create a task in the project
  - Returns updated project
  - The project id is required in route parameters
  - The property ```title``` is required
  - Url example: http://localhost:3000/projects/10/tasks
- DELETE
  - Delete project
  - The project id is required in route parameters
  - Url example: http://localhost:3000/projects/10