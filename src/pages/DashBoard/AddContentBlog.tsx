import React, { useState, useEffect, ChangeEvent } from 'react'
import Draft from 'draft-js'
import reactDraftWysiwyg from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../OverLayTailwind.css'
import { useSelector } from 'react-redux'
import type { RootState } from '../../stores/store'
import Error403 from '../Error403'
import { getRoleInToken } from '../../utility/decodeJwt'

import blogApi from '../../api/blogApi'
import type { TypeUser } from '../../stores/userSlice'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'

export interface TypeBlog {
    alias: string
    content: string
    title: string
}

const AddContentBlog = () => {
    const user = useSelector((state: RootState) => state.users)
    const [role, setRole] = useState<string | 'user'>('user')
    const [alias, setAlias] = useState<string | ''>('')
    const [title, setTitle] = useState<string | ''>('')

    const [errorAddContentBlog, setErrorAddContentBlog] = useState<string | null>(null)
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
        setErrorAddContentBlog(null)
        if (
            Draft.convertToRaw(editorState.getCurrentContent()).blocks.length >
            1 &&
            alias && title
        ) {
            console.log(editorState.getCurrentContent())
            let temp: TypeBlog = {
                content: JSON.stringify(
                    Draft.convertToRaw(editorState.getCurrentContent()),
                ),
                alias: alias,
                title: title
            }
            //console.log(temp)
            blogApi
                .postOne(temp)
                .then((res) => {
                    //console.log(res)
                    toast.info(`${res.data.message}`, {
                        position: 'bottom-center',
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
                .catch((error) => {
                    //console.log(error)
                    setErrorAddContentBlog(error.error.error)
                })
        } else {
            console.log('Input the field!')
            setErrorAddContentBlog('Input the field!')
        }
    }
    return (
        <>
            {role === 'admin' ? (
                <>
                    <Helmet>
                        <title>Add new blog</title>
                        <link rel="canonical" href="https://cpt-ha.web.app" />
                    </Helmet>
                    <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
                        <reactDraftWysiwyg.Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={onEditorStateChange}
                        />
                    </div>
                    <div className="mt-4 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
                        <input
                            className="w-full"
                            type="text"
                            value={alias}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setAlias(event.target.value)
                            }
                            placeholder="Alias"
                            onBlur={() => setErrorAddContentBlog(null)}
                        />
                    </div>
                    <div className="mt-2 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
                        <input
                            className="w-full"
                            type="text"
                            value={title}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Title"
                            onBlur={() => setErrorAddContentBlog(null)}
                        />
                    </div>
                    {errorAddContentBlog && (<div className="mt-2 w-11/12 xl:w-2/3 md:h-3/4 mx-auto">
                        <p className="text-base text-red-600">{errorAddContentBlog}</p>
                    </div>)}



                    <button className="px-6 py-2 bg-blue-600 mt-4 rounded-md" onClick={onSave}>
                        Save
                    </button>
                </>
            ) : (
                    <Error403 />
                )}
        </>
    )
}

export default AddContentBlog
