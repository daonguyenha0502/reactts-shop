import React from 'react'
import { Helmet } from 'react-helmet-async'

interface Props { }

const Error403 = (props: Props) => {
    return (
        <div className="pt-14 min-h-screen">
            <Helmet>
                <title>Error</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
            <h1 className="text-3xl text-red-500 dark:text-red-400 pt-14">403</h1>
        </div>
    )
}

export default Error403
