import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userInstance } from '@/utils/userInstance'
import { postTypes } from '@/types/data'

const AdminReview = () => {
    const router = useRouter()
    const [postReview, setPostReview] = useState<postTypes>({} as postTypes)

    useEffect(() => {
        async function fetchPost() {
            const response = await userInstance("get", `posts/admin/mutate/${router.query.id}`)
            setPostReview(response.data)
        }
        fetchPost()
    }, [router.query.id]) //eslint-disable-line

    return (
        <section className='w-full mt-4 md:w-[40rem]'>
            <div className="w-full md:w-40rem">
                {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={postReview.image_url} alt={`${postReview.title}`} width={300} height={300} className="w-full" />
                }
            </div>

            <div className="mt-3">
                <h1 className='text-3xl font-semibold text-secondary mt-3 capitalize'>{postReview.title}</h1>

                <h4 className='text-xl mt-3'>By:<span className="text-red-300 capitalize"> {postReview.author?.full_name}</span></h4>
                <p className="mt-2 text-xl leading-8">{postReview.body}</p>
            </div>
        </section>
    )
}

export default AdminReview