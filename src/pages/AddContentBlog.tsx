import React, { useState } from 'react';
import Draft from 'draft-js';
import reactDraftWysiwyg from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './OverLayTailwind.css'


const AddContentBlog = () => {
    const [editorState, setEditorState] = useState(Draft.EditorState.createEmpty())
    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
    }
    const onSave = () => {
        if (Draft.convertToRaw(editorState.getCurrentContent()).blocks.length > 1) {
            //console.log(Draft.convertToRaw(editorState.getCurrentContent()))
        } else {
            console.log('Input the field!')
        }
    }
    return (
        <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
            <reactDraftWysiwyg.Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
            <button onClick={onSave}>Save</button>
        </div>
    );
}

export default AddContentBlog
