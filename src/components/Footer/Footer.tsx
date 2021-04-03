import React from 'react'

import Contact from './Contact'
import Policy from './Policy'
import Socials from './Socials'

interface Props { }

const Footer = (props: Props) => {
    return (
        <div className="flex flex-wrap w-full h-auto py-4 leading-10 text-lg dark:bg-gray-700 bg-gray-100 justify-center mt-5">
            <Socials />
            <Contact />
            <Policy />
        </div>
    )
}

export default Footer
