import React from 'react';

import Contact from './Contact';
import Policy from './Policy';
import Socials from './Socials';

interface Props { }

const Footer = (props: Props) => {
    return (
        <div className="flex flex-wrap w-full h-auto py-4 leading-10 text-lg bg-blue-700 justify-center mt-5">
            <Socials />
            <Contact />
            <Policy />
        </div>
    );
};

export default Footer;
