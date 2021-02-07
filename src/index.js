require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3100

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    api: 'Mimic',
    endpoints: {
      mimic: {
        method: 'post',
        endpoint: '/mimic',
        input: 'any',
        description: 'Will mimic anything that is sent in the `body` of the request'
      },
      cdkSubModuleEnv: {
        method: 'get',
        endpoint: '/cdk-submodule-env',
        description: 'Will list specific stack ENVs used by the CDK-submodule management repository'
      }
    }
  })
})

app.post('/mimic', (req, res) => {
  const body = req.body

  res.json({
    ...body,
    message: 'You have been mimicked! >:D'
  })
})

app.get('/cdk-submodule-env', (req, res) => {
  res.json({
    cdkSubmodules: process.env.CDK_SUBMODULES
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})