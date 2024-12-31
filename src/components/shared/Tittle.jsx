import React from 'react'
import {Helmet} from 'react-helmet-async'


const Tittle = ({tittle = "Sandesh", description = "This is Sandesh app"}) => {
  return (
    <Helmet>
        <title>{tittle}</title>
        <meta name='description' content={description}/>
    </Helmet>
  )
}

export default Tittle
