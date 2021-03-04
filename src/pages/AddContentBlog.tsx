import React, { useState,useEffect } from 'react';
import Draft from 'draft-js';
import reactDraftWysiwyg from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './OverLayTailwind.css'
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import Error from './Error';
import { getRoleInToken } from '../utility/decodeJwt';

const AddContentBlog = () => {
    const user = useSelector((state: RootState)=> state.users)
    const [role, setRole] = useState<string|'user'>('user')
    useEffect(() => {
        async function getTk() {
            const temp = await getRoleInToken(user.refreshToken)
            setRole(temp)
        }
        getTk()
    }, [])
    
    
    if(user.accessToken && user.refreshToken && role === 'admin'){
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
            <>
            <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
                <reactDraftWysiwyg.Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                />
                
            </div>
            <button className="px-6 py-2 bg-blue-600" onClick={onSave}>Save</button>
            </>
        )
    }else{
        return(
            <Error/>
        )
    }
    
}

export default AddContentBlog
