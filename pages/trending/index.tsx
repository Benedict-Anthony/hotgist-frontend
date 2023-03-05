import React, { ChangeEvent, useState } from 'react'
import Post from '@/components/Post'
import { postListTypes } from '@/types/data'
import { AxionsInstance } from '@/utils/axios'
import { GetStaticProps } from 'next'
import { FaSearch } from "react-icons/fa"

const Index = ({ posts }: postListTypes) => {

    const [postList, setPostList] = useState(posts)
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const search = new RegExp(`${e.target.value}`, "gi")
        if (e.target.value === "") {
            setPostList(posts)
            return;
        }
        const filtered = postList.filter((post) => post.title.toLowerCase().match(search))
        setPostList(filtered)

    }
    return (
        <section className="w-full">
            <div className="flex justify-end search items-end w-full relative">
                < input type="text" className='w-full md:w-[25rem] py-3 px-3 outline-none border-none drop-shadow-md rounded-md focus:outline-1 focus:outline-red-200' onChange={(handleSearch)} />
                <FaSearch className="text-2xl text-secondary absolute top-3 right-4 cursor-pointer" />
            </div >

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center w-full md:gap-20 xl:grid-cols-4">
                {postList.length > 0 && postList.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        </section >
    )
}


export const getStaticProps: GetStaticProps = async () => {

    const response = await AxionsInstance.get("posts/")

    return {
        props: {
            posts: response.data

        },
        revalidate: 5
    }
}

export default Index