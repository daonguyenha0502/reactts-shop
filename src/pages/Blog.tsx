import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import blogApi from '../api/blogApi'

const Blog = () => {
    const { idBlog }: any = useParams()
    const [content, setContent] = useState<string|''>('')
    useEffect(() => {
       const res: any = blogApi.getOne(idBlog)
       console.log(res)
       setContent(res)
    }, [idBlog])
    console.log(idBlog)
  
    return (
        <div className="mt-14 w-11/12 xl:w-2/3 md:h-3/4 mx-auto border border-gray-700 rounded-sm">
            {content}
        </div>
    );
}

export default Blog