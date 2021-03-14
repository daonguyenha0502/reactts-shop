import React from 'react'
import { Helmet } from 'react-helmet-async'

interface Props { }

const Error = (props: Props) => {
    return (
        <div className="mt-14">
            <Helmet>
                <title>Error</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
            <h1 className="text-3xl text-red-500">403</h1>
        </div>
    )
}

export default Error
