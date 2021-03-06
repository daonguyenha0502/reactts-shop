import React, { useState, useEffect } from 'react'
import Draft from 'draft-js'
import reactDraftWysiwyg from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './OverLayTailwind.css'
import { useSelector } from 'react-redux'
import type { RootState } from '../stores/store'
import Error from './Error'
import { getRoleInToken } from '../utility/decodeJwt'

import blogApi from '../api/blogApi'
import type { TypeUser } from '../stores/userSlice'

export interface TypeBlog {
    alias: string
    content: string
}

const AddContentBlog = () => {
    const user = useSelector((state: RootState) => state.users)
    const [role, setRole] = useState<string | 'user'>('user')
    useEffect(() => {
        async function getTK(user: TypeUser) {
            let tk = await getRoleInToken(user.accessToken)
            setRole(tk)
        }
        getTK(user)
    }, [])

    const [editorState, setEditorState] = useState(
        Draft.EditorState.createEmpty(),
    )
    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
    }
    const onSave = () => {
        if (
            Draft.convertToRaw(editorState.getCurrentContent()).blocks.length >
            1
        ) {
            let temp: TypeBlog = {
                content: JSON.stringify(
                    Draft.convertToRaw(editorState.getCurrentContent()),
                ),
                alias: 'asdsads',
            }
            console.log(temp)
            blogApi
                .postOne(temp)
                .then((error) => console.log(error))
                .catch(() => console.log('error st'))
        } else {
            console.log('Input the field!')
        }
    }
    return (
        <>
            {role === 'admin' ? (
                <>
                    <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
                        <reactDraftWysiwyg.Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={onEditorStateChange}
                        />
                    </div>
                    <button className="px-6 py-2 bg-blue-600" onClick={onSave}>
                        Save
                    </button>
                </>
            ) : (
                <Error />
            )}
        </>
    )
}

export default AddContentBlog
