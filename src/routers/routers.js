const bodyParser = require('body-parser')
const express = require('express')
const app = express();
//const session = require('express-session');

// App Releated Sapce
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  // session({
  //   secret: 'secret',
  //   resave: true,
  //   saveUninitialized: true
  // })
)

//Token
const jwtAuth = require('../middleware/jwt');
// Decleration of controller 
const test = require('../controllers/test/test.js')
const login = require('../controllers/login/login.js')

// Root Path
app.get('/', (request, response) => {
    response.json({ info: 'Santhosh Ambekar' })
})

// Test
app.get('/users', test.getUsers)
app.post('/user', test.getuser)
app.get('/testAPI', test.testAPI)

// Login
app.post('/auth', login.auth)
app.get('/home',jwtAuth.authenticateJWT, login.home)
app.get('/logout', login.logout)


module.exports= app ;