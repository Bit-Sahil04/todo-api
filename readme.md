# TODO-REST-API

### A simple todo list REST API built using express, nodejs and mongodb


### Endpoints:

- ``POST`` /login - log in existing user
- ``POST`` /signup - sign up as a new user
- ``GET`` /todos - get user specific list of todos
- ``POST`` /todos - create a new todo item
- ``PUT`` /todos/:id - update an existing todo
- ``DELETE`` /todos/:id - delete an existing todo item
- ``GET`` /todos/:id - get a single todo



objectives:
> design schema for todos
> create routes and controllers for ``GET, POST, DELETE, PUT`` todos
> connect to DB
> create todo model
> create user model
> create implement registration
> implement authentication using JWT