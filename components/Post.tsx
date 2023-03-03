import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { postTypes } from "@/types/data";



const Post = ({ id, image_url, excerpt, slug, title }: postTypes) => {
    return (
        <article className='mb-6 border-b-2 border-r-2 pr-4 pb-4 card w-full'>
            <div className="flex justify-between space-x-2 items-start img w-full">
                <h2 className="text-secondary text-xl py-2 font-bold w-full">{title}</h2>
                <Image src={image_url} alt='' width={400} height={300} />

            </div>
            <div className="mt-3">
                <p className="text-xl">{excerpt}</p>
            </div>
            <div className="mt-5 ">
                <Link href={`trending/detail/${slug}/`} className='rounded-md border'>Read More</Link>
            </div>
        </article>
    )
}

export default Post