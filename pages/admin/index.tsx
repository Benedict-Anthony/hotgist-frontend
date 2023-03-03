import AdminPost from '@/components/AdminPost'
import React, { useEffect } from 'react'
import useSwr from "swr";
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import { useRouter } from 'next/router';


const Index = () => {
    const token = JSON.parse(localStorage.getItem("token") as any)
    const router = useRouter()
    const fetcher = async () => {
        const response = await axios({
            method: "get",
            url: `${baseUrl}posts/admin/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            }

        })

        return response.data
    }
    const { data, error, isLoading } = useSwr("post/my-posts/", fetcher)
    if (isLoading) {
        return (
            <h2 className="text-center mt-5 text-3xl font-semibold text-secondary">Loading....</h2>
        )
    }


    async function handleDelete(id: number) {

        const response = await axios({
            method: "delete",
            url: `${baseUrl}posts/mutate/${id}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            }

        })

        if (response.statusText === "OK") alert("Deleted Sucessfuly")

    }



    async function handlePublish(id: number) {
        const response = await axios({
            method: "patch",
            url: `${baseUrl}posts/mutate/${id}/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            }

        })
        if (response.statusText === "OK") alert("Published Sucessfuly")


    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center w-full mt-4 md:gap-20 xl:grid-cols-4">
            {data && data.length > 0 && data.map((post: any) => (
                <AdminPost
                    key={post.id}
                    post={post}
                    handleDelete={() => handleDelete(post.id)}
                    handlePublish={() => handlePublish(post.id)}
                />
            ))}
        </div>
    )
}

export default Index