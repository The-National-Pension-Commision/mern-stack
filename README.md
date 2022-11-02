# MERN Stack Training at PENCOM

Repository for all modules and projects worked on at the training.
Diagrams are available in the specific repository readme.md

# 1. Authentication Module

This is an authentication module written in React CRA (front-end) and Node.js (back-end) that employs the Sequelize ORM and a MySQL database for storage.
In this project we implemented a Rest API, a Proxy to target our server,
appropriate CORS headers and several features which would be covered below.

Below are the steps that were taken during the development process of the module

## Set up a MySQL Database Schema

    1. Attempt
    ```sql
    mysql -u root -p
    ```
    to ensure that the server is currently running.
    2. Headover to workbench.
    3. Create a new Database Schema. Call it "pencom-apps" then apply.

## Setting up an Express Server

    1. Create a folder name. You can call it anything. But usually sticky with backend or server.
    2. Run npm init. To create your package.json, or ```npm init -y`` to say
    yes to all.
    3. Input the data you are asked for each, if you do not use the ```-y``` option.
    4. Run ```npm install express express router``` to install the Express
    web framework.
    5. Create a server.js or index.js file, and include the entry point in your package.json.
    6. Install Nodemon to watch for changes in the server after updating.
    7. Set up the port configuration, preferably on ```http://localhost:5000```
    which we used for this specific application.
    8. Run npm start

## Configuring and Setting up an Express project

    1. Create the following folders:
        <b>- Config</b>
                Create a `db.config.js` to store your database configuration.
        <b>- Middleware</b>
                Create an `AuthJwt.js` file for JWT authentication, an `index.js` to export, and  `verifySignUp.js`
        <b>- Routes</b>
                Create the  `auth.routes.js` and `user.routes.js`
        <b>- Models</b>
                Create a `role.model.js` file and 'user.model.js' file and define the schemas.
        <b>- Controller</b>
                Create the `auth.controller` and `user.controller` files
                to handle the apis.

What's important here is your database configuration. It has to differ.

It should look like this:

```javascript
// Database Configs
module.exports = {
  HOST: "localhost", // hostname.
  USER: "admin", // name of the db user. i.e (mysql -u root -p) where "u" is username
  PASSWORD: "admin", // Leave blank if no password
  DB: "pencom-apps", // Schema or Database name
  dialect: "mysql", // You could select Postgres, Sqlite, etc
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```

You may need to install `mysql2` an important module for the ORM.
Go ahead.

```shell
npm install mysql2
```

## Install some dependencies

Run the following:

Install Sequelize ORM

```shell
npm install sequelize
```

Install CORS

```shell
npm install cors
```

Install body-parser

```shell
npm install body-parser
```

Install jsonwebtoken

```shell
npm install jsonwebtoken
```

Set up your `index.js` tthis way:

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("../server/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route

// include routes for the application
require("./Routes/auth.routes")(app);
require("./Routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
```

## Testing with a HTTP Client

You could test the api endpoints with several http clients using the endpoints
below:

```shell
http://localhost:5000/api/test/all - Test all
http://localhost:5000/api/test/user - Test for user
http://localhost:5000/api/test/mod - Test for mod
http://localhost:5000/api/test/admin - Test for admin
http://localhost:5000/api/auth/signin - Test Signin Routes
http://localhost:5000/api/test/Signup - Test Signup Routes
```

## Important methods and functionalites I know you ignored

1. The verification function

```javascript
verifyToken = (req, res, next) => {
    .......
}
```

`req` stands for request, `res` stands for response
`next()` will execute the code after the Middleware function has been completed.
It will jump out the callback immediately and the code below return next() will be unreachable

2. The sync method

```javaScript
db.sequelize.sync();
```

This would prevent the ORM from dropping previous tables and creating new ones again.

3.

```javascript
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
```

Allows us to relax the security applied to an API. This is done by bypassing the Access-Control-Allow-Origin headers.
Here we tell our backend to effectively target our react app client.

## Setting up the React Application

    1. Run ```yarn create react-app client```.
    2. Delete the junk files, and tests.
    3. Navigate to the `index.js` and clear report vitals.
    4. Delete the logo.svg in ``app.js`` and remaining junk in the ``<div>``

## Install some dependencies

Run the following:

Install http-proxy-middleware

```shell
yarn add http-proxy-middleware
```

Install React Router

```shell
yarn add react-router-dom
```

Install React Vallidation

```shell
yarn add react-validation
```

```diff
- Install Axios. Very necessary
```

```shell
yarn add axios
```

Or if you clone, just hit `npm install`

## More configuations

Create a file called `setupProxy.js` in the src folder.

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
```

The proxy implementation is for redirecting requests to APIs without having to go via the browser's default request options

## Creating Service Handlers

Using axios, the service handlers communicate with the express controllers and
apis effectively. We see this below:

```javascript
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (username, email, password) => {
.....
};
```

We created a method and appended a URL for axios to send posts and get methods
to the exposed apis.

## The Common?

This stores the files for the event bus and AuthVerification for the jsonwebtoken. You see, the simple purpose of this is to verify and parse
the access Token which would be sent into the Local Storage.

## The Components

The components folder holds the component files in .jsx used for the user
interace of the module. It also implements and calls in the AuthService,
which sends a post request to the controller, which submits the data collected
to the database.
The components folder also features validation.
Take for instance:

```javascript
if (checkBtn.current.context._errors.length === 0) {
  AuthService.register(username, email, password).then(
    (response) => {
      setMessage(response.data.message);
      setSuccessful(true);
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString().toLowerCase();

      setMessage(resMessage);
      setSuccessful(false);
    }
  );
}
```

This searches for errors within the form before initialising the register method. This is basically <i>client-side validation</i> in a nutshell.

So that is how we effectively connected the client to the server. Kindly see
the diagram below, and the specific readme.md of each folder.
