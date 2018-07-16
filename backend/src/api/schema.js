const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs =  `
    type City { 
        id: ID!
        name: String
        population: Int
        state: State
        mayor: Mayor
    }
    
    type Mayor {
        id: ID!
        name: String
        birthdate: String
        city: City
    }

    type State {
        id: ID!
        name: String
        cities: [City]
    }

    type Company {
        id: ID!
        name: String
        website: String
    }

    input CompanyInput {
        name: String
        website: String
    }

    input StateInput {
        name: String
    }

    input MayorInput {
        name: String
        birthdate: String
    }

    input CityInput { 
        name: String
        population: Int
        state_id: ID
        mayor_id: ID
    }
    
    type Query {
        getCity(id: ID!): City
        getState(id: ID!): State
    }
    
    type Mutation { 
        saveCity(input: CityInput!, id: ID): City
        saveState(input: StateInput!, id: ID): State
        saveMayor(input: MayorInput!, id: ID): Mayor
        saveCompany(input: CompanyInput!, id: ID): Company
    }
`
module.exports = makeExecutableSchema({typeDefs, resolvers})
