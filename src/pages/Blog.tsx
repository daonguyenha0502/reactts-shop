import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogApi from '../api/blogApi'

import Draft from 'draft-js'
import { wait } from '@testing-library/react'

const Blog = () => {
    const { idBlog }: any = useParams()
    const [content, setContent] = useState<string | ''>('')
    const [editorState, setEditorState] = useState(() =>
        Draft.EditorState.createEmpty(),
    )
    const handleChange = (editorState: any) => setEditorState(editorState)
    useEffect(() => {
        const getBlog = async () => {
            const res: any = await blogApi.getOne(idBlog)
            console.log(res.content)
            let temp: any = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };
            temp = await Draft.convertFromRaw(temp)
            console.log(temp)
            await setContent(temp.map)
        }
        getBlog()
    }, [idBlog])
    console.log(idBlog)

    return (
        <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
            {content}
            <Draft.Editor
                readOnly
                editorState={editorState}
                onChange={(editorState: any) => setEditorState(editorState)}
            />
        </div>
    )
}

export default Blog
