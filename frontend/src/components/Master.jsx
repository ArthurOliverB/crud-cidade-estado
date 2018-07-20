import './Master.css'
import React from 'react'

export default props => 
<div>
        <h2>{props.name}</h2>
        {props.cities.map(city => {
        return( 
            <div>
                <p>Id: {city.id}</p>
                <p>Nome: {city.name}</p>
                <p>População: {city.population}</p>
            </div>
        )
    })}
</div>
