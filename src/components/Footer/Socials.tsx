import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faGoogle,
    faTwitter,
    faTelegram,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons'

interface Props { }

const Socials = (props: Props) => {
    return (
        <>
            <ul className="flex-col text-left w-72 mx-auto pt-10 pl-8 sm:pl-24 text-black dark:text-gray-200">
                <li>
                    <FontAwesomeIcon icon={faFacebook} size="2x" /> Facebook
                </li>
                <li>
                    <FontAwesomeIcon icon={faTwitter} size="2x" /> Twitter
                </li>
                <li>
                    <FontAwesomeIcon icon={faTiktok} size="2x" /> Tiktok
                </li>
                <li>
                    <FontAwesomeIcon icon={faGoogle} size="2x" /> Google
                </li>
                <li>
                    <FontAwesomeIcon icon={faTelegram} size="2x" /> Telegram
                </li>
            </ul>
        </>
    )
}

export default Socials
