import React from 'react'

interface Props {
    onToggle: any
    label: any
    active: any
    style: any
}

const StyleButton = ({ onToggle, label, active, style }: Props) => {
    const handleToggle = (e: any) => {
        e.preventDefault()
        onToggle(style)
    }
    let className = 'RichEditor-styleButton'
    if (active) {
        className += ' RichEditor-activeButton'
    }
    return (
        <span className={className} onMouseDown={handleToggle}>
            {label}
        </span>
    )
}

export default StyleButton
