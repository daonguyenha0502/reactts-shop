import React from 'react'
import ItemComment from './ItemComment'
import type { Comment } from '../pages/ProductDetail'

interface Props {
    listComments: Comment[]
}

const ListComments = ({ listComments }: Props) => {
    return (
        <div className="w-11/12 md:w-4/5 xl:w-3/4 mx-auto py-4 mb-4">
            {listComments.length === 0 ? <h2>No Comment</h2> : (<><h2>Comment</h2>
                <ul className="px-4 space-y-1">
                    {
                        (listComments as Comment[]).map((comment: Comment) => {
                            return <ItemComment key={comment._id} comment={comment} />
                        })
                    }

                </ul></>)

            }

        </div>
    )
}

export default ListComments
