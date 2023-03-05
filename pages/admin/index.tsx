import AdminPost from '@/components/AdminPost'
import React, { useEffect } from 'react'
import useSwr from "swr";
import { userInstance } from '@/utils/userInstance';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Index = () => {
    const router = useRouter()
    const fetcher = async () => {
        const response = await userInstance("get", 'posts/admin')
        return response.data
    }

    const { data, error, isLoading } = useSwr("posts/admin/", fetcher)

    async function handleDelete(id: number) {
        toast.promise(
            () => userInstance("delete", `posts/admin/mutate/${id}`),
            {
                pending: 'Publishing... this may take a while',
                success: 'Post has been deleted successfuly. It may take a while to reflect... ',
                error: 'Oops, Something went wrong'
            }
        )
    }

    async function handlePublish(id: number) {
        toast.promise(
            () => userInstance("patch", `posts/admin/mutate/${id}`),
            {
                pending: 'Publishing... this may take a while',
                success: 'Post has been publish successfuly. It may take a while to reflect... ',
                error: 'Oops, Something went wrong'
            }
        )

    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token") as any) === null) {
            router.push("/signIn")
        }
    })

    if (isLoading) {
        return (
            <h2 className="text-center mt-5 text-3xl flex justify-center h-screen items-center font-semibold text-secondary">Loading....</h2>
        )
    }
    if (error) {
        return (
            <>
                <h2 className="text-center mt-5 text-2xl flex justify-center items-center h-screen font-semibold text-secondary">Something went Wrong</h2>
                <span className="text-xl text-red-400 mt-7">hecking for possible fix....</span>
            </>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start w-full mt-4 space-y-5 gap-x-10 xl:grid-cols-4">
                {data && data.length > 0 ? data.map((post: any) => (
                    <AdminPost
                        key={post.id}
                        post={post}
                        handleDelete={() => handleDelete(post.id)}
                        handlePublish={() => handlePublish(post.id)}
                    />
                )) : <h3 className="text-xl tex-secondary mt-3">No Posts</h3>}
            </div>
        </>
    )
}

export default Index