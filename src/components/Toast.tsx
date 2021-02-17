import React, { useEffect } from 'react'
import type { itemType } from 'src/App'
import type { typeToast } from '../app/toastSlice'

interface Props {
    stateToast: typeToast
    onClose: () => void
}

enum Color {
    S = "bg-green-600",
    W = "bg-red-600",
}

const Toast = ({ stateToast, onClose }: Props) => {
    useEffect(() => {
        const toast = setTimeout(() => {
            onClose()
        }, 3500)
        return () => {
            clearTimeout(toast)
        }
    }, [stateToast.state])


    return (
        stateToast.state ? (<div className="h-20 w-full fixed bottom-2 z-20">
            {stateToast.type === "S" ? (<div className={`relative ${Color.S} h-20 w-80 px-4 py-2 rounded-md mx-auto`}>
                <button className="absolute top-1 right-2 px-1.5 rounded-full" onClick={() => onClose()}>x
                        </button>
                <h1 className="text-2xl">Product added to cart</h1>
                {stateToast.data && (<p className="truncate">{stateToast.data.name}</p>)}
            </div>) : (<div className={`relative ${Color.W} h-20 w-80 px-4 py-2 rounded-md mx-auto`}>
                <button className="absolute top-1 right-2 px-1.5 rounded-full" onClick={() => onClose()}>x
                        </button>
                <h1 className="text-2xl">Product removed from cart</h1>
            </div>)}

        </div>) : null
    )
}

export default Toast
