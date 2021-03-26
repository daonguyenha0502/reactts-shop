import React from 'react'
import type { Comment } from '../pages/ProductDetail'

interface Props {
    comment: Comment
}

const ItemComment = ({ comment }: Props) => {
    return (
        <div>
            <>
                <li className="text-left p-2 border border-gray-800 rounded-md">
                    <p className="px-2 w-min text-base rounded-md text-white font-bold bg-gray-500">{comment.name}</p>
                    <p className="text-base break-words font-normal pl-4">{comment.content}</p>
                </li>
            </>
        </div>
    )
}

export default ItemComment
