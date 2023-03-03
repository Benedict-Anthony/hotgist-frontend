import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetStaticProps } from 'next/types'
import { AxionsInstance } from '@/utils/axios'
import { postListTypes } from '@/types/data'
import Link from 'next/link'
import Post from '@/components/Post'


const inter = Inter({ subsets: ['latin'] })
export default function Home({ posts }: postListTypes) {
  const firstPost = posts[0]
  return (

    <section className='w-full flex flex-col justify-between items-start md:flex-row md:space-x-10 mt-6'>
      <article className="">
        <div className="image">
          <Image src={firstPost.image_url} alt='' width={300} height={300} className='w-full md:w-[30rem]' />
        </div>
        <div >
          <Link href={`trending/detail/${firstPost.slug}`}>
            <h2 className="text-secondary text-xl py-2 font-bold">{firstPost.title} </h2>
            <p className="leading-7 text-xl ">{firstPost.excerpt}</p>
          </Link>
        </div>
      </article >

      <aside className='w-full'>
        {posts.length > 0 && posts.slice(1, 3).map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </aside>
    </section >


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


