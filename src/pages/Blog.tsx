import React, { useState, useRef, ChangeEvent } from 'react'
import 'draft-js/dist/Draft.css';
import './RichText.css'
import Draft from 'draft-js'
import BlockStyleControls from '../components/RichEditor/BlockStyleControls';
import InlineStyleControls from '../components/RichEditor/InlineStyleControls';


interface Props {

}
type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;

const Blog = (props: Props) => {
    const styleMap = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
    };

    function getBlockStyle(block: Draft.ContentBlock) {
        //with tailwindcss
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            case 'header-one': return 'text-6xl font-bold';
            case 'header-two': return 'text-5xl font-bold';
            case 'header-three': return 'text-4xl font-bold';
            case 'header-four': return 'text-3xl font-bold';
            case 'header-five': return 'text-2xl font-bold';
            case 'header-six': return 'text-xl font-bold';
            default: return "";
        }
    }

    const [editorState, setEditorState] = useState(() => Draft.EditorState.createEmpty())
    const editor = useRef(null)
    const handleChange = (editorState: any) => setEditorState(editorState)
    const _handleKeyCommand = (command: Draft.DraftEditorCommand, editorState: Draft.EditorState): Draft.DraftHandleValue => {
        const newState = Draft.RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleChange(newState)
            return 'handled';
        }
        return 'not-handled';
    }

    const _mapKeyToEditorCommand = (e: SyntheticKeyboardEvent): string | null => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = Draft.RichUtils.onTab(
                e,
                editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== editorState) {
                handleChange(newEditorState);
            }
            return '';
        }
        return Draft.getDefaultKeyBinding(e);
    }

    const _toggleBlockType = (blockType: any) => {
        console.log(blockType + 'a')
        handleChange(
            Draft.RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    const _toggleInlineStyle = (inlineStyle: any) => {
        handleChange(
            Draft.RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }
    return (
        <div className="RichEditor-root mt-14">
            <BlockStyleControls
                editorState={editorState}
                onToggle={_toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={_toggleInlineStyle}
            />
            <div className={className} onClick={focus}>
                <Draft.Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={_handleKeyCommand}
                    keyBindingFn={(e) => _mapKeyToEditorCommand(e)}
                    onChange={(editorState: any) => setEditorState(editorState)}
                    placeholder="Tell a story..."
                    ref={editor}
                    spellCheck={true}
                />
            </div>
        </div>
    );
}

export default Blog






