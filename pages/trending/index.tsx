import Post from '@/components/Post'
import { postListTypes } from '@/types/data'
import { AxionsInstance } from '@/utils/axios'
import { GetStaticProps } from 'next'
import React from 'react'

const Index = ({ posts }: postListTypes) => {
    return (
        <section>
            <h1>Trending</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center w-full gap-20 xl:grid-cols-4">
                {posts.length > 0 && posts.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        </section>
    )
}


export const getStaticProps: GetStaticProps = async () => {

    const response = await AxionsInstance.get("posts/")

    return {
        props: {
            posts: response.data

        },
        revalidate: 10
    }
}

export default Index