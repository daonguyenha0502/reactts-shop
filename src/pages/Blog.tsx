import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogApi from '../api/blogApi'

import Draft from 'draft-js'
import reactDraftWysiwyg from 'react-draft-wysiwyg'
import { Helmet } from 'react-helmet-async'

const Blog = () => {
    const { idBlog }: any = useParams()
    const [editorState, setEditorState] = useState(
        Draft.EditorState.createEmpty(),
    )
    const [title, setTitle] = useState<string | ''>('')
    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
    }

    useEffect(() => {
        const getBlog = async () => {
            const res: any = await blogApi.getOne(idBlog)
            let a = await res.content
            if (a !== undefined) {
                try {
                    setTitle(res.title)
                    let b: any = await Draft.convertFromRaw(JSON.parse(a))
                    setEditorState(Draft.EditorState.createWithContent(b))
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getBlog()
    }, [idBlog])
    return (
        <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto rounded-sm">
            {/* <Draft.Editor
                readOnly
                editorState={editorState}
                onChange={onEditorStateChange}
            /> */}
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href="cpt-ha.web.app" />
            </Helmet>
            <reactDraftWysiwyg.Editor
                readOnly
                toolbarHidden
                editorState={editorState}
                // wrapperClassName="demo-wrapper"
                // editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>

    )
}

export default Blog
