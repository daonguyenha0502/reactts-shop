import React, { ChangeEvent } from 'react'
import { faHome, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTypeSafeTranslation } from '../../utility/useTypeSafeTranslation'
import LangSelection from '../../components/LangSelection'

interface Props { }

const Policy = (props: Props) => {
    const { t } = useTypeSafeTranslation()
    return (
        <>
            <ul className="flex-col text-left w-72 mx-auto pt-10 pl-8 text-black dark:text-gray-200">
                <li>{t('footer.lang')}:{' '}
                    <LangSelection />
                </li>
                <li>
                    <FontAwesomeIcon icon={faHome} /> Hà Nội
                </li>
                <li>
                    <FontAwesomeIcon icon={faPhone} /> 0376214088
                </li>
                <li>
                    <FontAwesomeIcon icon={faEnvelope} /> daonguyxx@gmail.com
                </li>
            </ul>
        </>
    )
}

export default Policy
