import { postDetail } from '@/types/data';
import { AxionsInstance } from '@/utils/axios'
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import React from 'react'

const PostDetail = ({ post }: postDetail) => {
    return (
        <section className='w-full mt-4 md:w-[40rem]'>
            <div className="w-full md:w-40rem">
                <Image src={post.image_url} alt={post.title} width={300} height={300} className="w-full" />
            </div>

            <div className="mt-3">
                <h1 className='text-3xl font-semibold text-secondary mt-3 capitalize'>{post.title}</h1>
                <h4 className='text-xl mt-3'>By:<span className="text-red-300 capitalize"> {post.author?.full_name}</span></h4>
                <p className="mt-2 text-xl leading-8">{post.body}</p>
            </div>
        </section>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const reponse = AxionsInstance.get("posts/")

    const paths = (await reponse).data.map((post: { slug: string }) => {
        return {
            params: {
                slug: post.slug
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    const slug = params?.slug as string
    const response = await AxionsInstance.get(`posts/detail/${slug}/`)
    console.log(response.data)
    console.log(context)

    return {
        props: {
            post: response.data
        }
    }


}
export default PostDetail