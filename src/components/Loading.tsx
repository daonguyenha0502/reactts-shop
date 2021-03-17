import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface Props {

}

const Loading = (props: Props) => {
    return (
        <>
            <div className="opacity-50 fixed inset-0 w-full h-full z-20 bg-black"></div>
            <div
                className="justify-center items-center mt-4 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none"

            ><FontAwesomeIcon icon={faSpinner} size="4x" pulse /></div>
        </>
    )
}

export default Loading
