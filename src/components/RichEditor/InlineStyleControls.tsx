import React from 'react'
import StyleButton from './StyleButton'

interface Props {
    editorState: any

    onToggle: any
}
const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = ({ editorState, onToggle }: Props) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

export default InlineStyleControls

