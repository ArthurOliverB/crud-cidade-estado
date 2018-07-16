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
        async saveState(_, { input, id }) {
            let result_id = 0

            if(id) {
                await db('states').where({id}).update({
                    name: input.name
                })
                result_id = id
            } else {
                const result = await db('states').insert({
                    name: input.name
                })
                result_id = result[0]
            }
            
            return await db('states').where({id: result_id}).first()
        }, 
        async saveCompany(_, { input, id }) {
            let result_id = 0

            if(id) {
                await db('companies').where({id}).update({
                    name: input.name,
                    website: input.website
                })
                result_id = id
            } else {
                const result = await db('companies').insert({
                    name: input.name,
                    website: input.website
                })
                result_id = result[0]
            }
            return await db('companies').where({id: result_id}).first()
        },
        async saveBranchOffice(_, { input, id }) {
            let result_id = 0

            if(id) {
                await db('branch_offices').where({id}).update({
                    address: input.address,
                    city_id: input.city_id,
                    company_id: input.company_id
                })
                result_id = id
            } else {
                const result = await db('branch_offices').insert({
                    address: input.address,
                    city_id: input.city_id,
                    company_id: input.company_id
                })
                result_id = result[0]
                console.log(result)
            }
            
            return await db('branch_offices').where({id: result_id}).first()
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
    }, 
    BranchOffice: {
        async city(office) {
            return await db('cities').where({id: office.city_id}).first()
        },
        async company(office) {
            return await db('companies').where({id: office.company_id}).first()
        }
    }, 
    Company: {
        async branch_offices(company){
            console.log(company)
            return await db('branch_offices').where({id: company.id})
        }
    }
}