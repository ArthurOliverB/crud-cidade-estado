const db = require('../config/database')

module.exports = {

    Query: {
        async getCity(_, { id }) {
            return await db('cities').where({id}).first()
        },
        async getState(_, { id }) {
            return await db('states').where({ id }).first()
        }
    }, 
    Mutation: {
        async saveMayor(_, {input, id}) {
            let result_id = 0
            if(id) {
                const birthdate = new Date(input.birthdate).toLocaleDateString()
                await db('mayors').where({id}).update({
                    name: input.name,
                    birthdate
                })
                result_id = id
            } else {

                const birthdate = new Date(input.birthdate).toLocaleDateString()
                
                console.log(birthdate)
                const result = await db('mayors').insert({
                    name: input.name,
                    birthdate
                })
                result_id = result[0]
            }
            const result = await db('mayors').where({id: result_id}).first()
            result.birthdate = new Date(result.birthdate).toLocaleDateString()
            
            return result
        },
        async saveCity(_, { input, id }) {
            let result_id = 0;
            if(id) {
                await db('cities').where({id}).update({
                    name: input.name,
                    population: input.population,
                    state_id: input.state_id,
                    mayor_id: input.mayor_id
                })
                result_id = id
            } else {
                const result = await db('cities').insert({
                    name: input.name,
                    population: input.population,
                    state_id: input.state_id,
                    mayor_id: input.mayor_id
                })
                
                result_id = result[0]
            }
            return await db('cities').where({id: result_id}).first()
        },
        async saveState(_, { input }) {
            const result = await db('states').insert({
                name: input.name
            })
            const id = result[0]
            
            return await db('states').where({id}).first()
        }
    }, 
    State: {
       async cities(state) {
            return await db('cities').where({state_id: state.id})
        }
    }, 
    City: {
        async mayor(city) {
            const result  = await db('mayors').where({id: city.mayor_id}).first()
            result.birthdate = new Date(result.birthdate).toLocaleDateString()
            return result
        },
        async state(city) {
            console.log(city)
            return await db('states').where({id: city.state_id}).first()
        }
    }, 
    Mayor: {
        async city(mayor) {
            return await db('cities').where({mayor_id: mayor.id}).first()
        }
    }
}