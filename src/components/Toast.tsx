import React, { useState, useEffect } from 'react'
import type { itemType } from 'src/App'

interface Props {
    isOpen: boolean
    setIsOpen: (state: boolean) => void
    dataToast: itemType | null
    type: "S" | "W"
}

enum Color {
    S = "bg-green-600",
    W = "bg-red-600",
}

const Toast = ({ isOpen, setIsOpen, dataToast, type }: Props) => {
    useEffect(() => {
        const toast = setTimeout(() => {
            setIsOpen(false)
        }, 3500)
        return () => {
            clearTimeout(toast)
        }
    }, [isOpen])


    return (
        isOpen ? (<div className="h-20 w-full fixed bottom-2 z-20">
            {type === "S" ? (<div className={`relative ${Color.S} h-20 w-80 px-4 py-2 rounded-md mx-auto`}>
                <button className="absolute top-1 right-2 px-1.5 rounded-full" onClick={() => setIsOpen(false)}>x
                        </button>
                <h1 className="text-2xl">Product added to cart</h1>
                {dataToast && (<p className="truncate">{dataToast.name}</p>)}
            </div>) : (<div className={`relative ${Color.W} h-20 w-80 px-4 py-2 rounded-md mx-auto`}>
                <button className="absolute top-1 right-2 px-1.5 rounded-full" onClick={() => setIsOpen(false)}>x
                        </button>
                <h1 className="text-2xl">Product removed from cart</h1>
            </div>)}

        </div>) : null
    )
}

export default Toast
