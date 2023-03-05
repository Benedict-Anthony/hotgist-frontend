import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Button from './Button'
import { postTypes } from '@/types/data';

type adminPostTypes = {
    post: postTypes,
    handleDelete: () => void
    handlePublish: () => void
}
const AdminPost = ({ post, handleDelete, handlePublish }: adminPostTypes) => {
    return (
        <article className='mb-6 border-b-2 border-r-2 pr-4 pb-4 card w-full'>
            <div className="flex justify-between space-x-2 items-start img w-full">
                <h2 className="text-secondary text-xl py-2 font-bold w-full capitalize">{post.title}</h2>
                <Image src={post.image_url} alt='' width={400} height={300} />
            </div>
            <div className="mt-3">
                <p>By: <span>{post.author?.full_name}</span></p>
                <p className="text-xl">{post.excerpt}
                </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 justify-between items-center w-full">
                <Button action='View'>
                    <Link href={`/admin/${post.id}/`} className='border-0'>view</Link>
                </Button>
                <Button action='Edit' >
                    <Link href={`/new/${post.id}/`} className='border-0'>Edit</Link>
                </Button>
                {post.is_published !== true && <Button action='Publish' handlerClick={handlePublish}>Publish</Button>}

                <Button action='Delete' handlerClick={handleDelete} >Delete</Button>

            </div>
        </article>
    )
}

export default AdminPost