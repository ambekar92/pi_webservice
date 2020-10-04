const app = require('./src/routers/routers.js')

const port = 8001

app.listen(port, () => {
  console.log('Application Started Successfully:',port )
})