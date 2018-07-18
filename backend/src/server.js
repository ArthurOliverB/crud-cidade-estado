const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const schema =  require('./api/schema')
const { graphqlExpress } = require('apollo-server-express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(cors())
app.use('/graphql', bodyParser.json(),graphqlExpress({schema}))
app.listen(4000, () => console.log('Executando...'))

