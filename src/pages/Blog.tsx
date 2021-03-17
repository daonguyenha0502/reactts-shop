import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogApi from '../api/blogApi'

import Draft from 'draft-js'
import reactDraftWysiwyg from 'react-draft-wysiwyg'
import { Helmet } from 'react-helmet-async'
import type { TypeResponse } from '../api/axiosClient'
import Loading from '../components/Loading'

const Blog = () => {
    const { idBlog }: any = useParams()
    const [editorState, setEditorState] = useState(
        Draft.EditorState.createEmpty(),
    )
    const [title, setTitle] = useState<string | ''>('')
    const [errorBlog, setErrorBlog] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean | true>(true)

    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
    }

    useEffect(() => {
        const getBlog = async () => {
            setIsLoading(true)
            try {
                const res: TypeResponse = await blogApi.getOne(idBlog)
                let a = await res.data.content
                if (a !== undefined) {
                    setTitle(res.data.title)
                    let b: any = await Draft.convertFromRaw(JSON.parse(a))
                    setEditorState(Draft.EditorState.createWithContent(b))
                    setIsLoading(false)
                }
            } catch (error) {
                setErrorBlog(error.error.error)
                setIsLoading(false)
            }

        }
        getBlog()
    }, [idBlog])
    return (
        <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto rounded-sm">
            {isLoading ? <Loading /> : errorBlog ? <><h1 className="text-red-700 pt-28">{errorBlog}</h1></> : (<><Helmet>
                <title>{title}</title>
                <link rel="canonical" href="https://cpt-ha.web.app" />
            </Helmet>
                <reactDraftWysiwyg.Editor
                    readOnly
                    toolbarHidden
                    editorState={editorState}
                    // wrapperClassName="demo-wrapper"
                    // editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                /></>)}

        </div>

    )
}

export default Blog
