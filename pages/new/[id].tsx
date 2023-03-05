import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { userInstance } from '@/utils/userInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type postProps = {
    title: string
    body: string
    tags: number[]
    slug: string
    author: number
}
type post = postProps

const UpdatePost = () => {
    const [files, setFiles] = useState<any>([])
    const [formData, setFormData] = useState<any>({
        title: "",
        id: "",
        body: "",
        image: "",
        author: ""
    })
    const router = useRouter()

    useEffect(() => {
        const fetcher = async () => {
            const response = await userInstance("get", `posts/admin/mutate/${router.query.id}`)

            if (response.status === 200) {
                const { data } = response
                setFormData({
                    ...formData,
                    author: data.author.id,
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    image: data.image

                })
            }

        }

        fetcher()
    }, []) //eslint-disable-line

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const sendPost = async (e: React.FormEvent<HTMLFormElement>) => {
        const token = JSON.parse(localStorage.getItem("token") as any)

        e.preventDefault()
        const user: any = jwtDecode(token.access)

        const postData = {
            author: formData.author,
            title: formData.title,
            body: formData.body,
            tags: formData.tags,
            slug: formData.slug,
            image: files.length > 0 ? files[0] : formData.image

        }

        const response = await userInstance("put", `posts/admin/mutate/${router.query.id}`, postData, "multipart/form-data")
        if (response.status == 201 || response.status === 200) {
            toast("Updating Post...")

            router.push("/admin")
        } else {
            alert(response.statusText)
        }
    }


    return (
        <>
            <ToastContainer />
            <section className='md:px-10 w-full mx-auto flex justify-center items-center mt-4'>
                <div className="w-full md:w-[30rem]">
                    <h1 className='text-2xl mb-4 py-3 text-red-400 md:font-semibold'>Make a new post</h1>


                    <form className='bg-gray-300 px-4 py-5 w-full rounded-sm drop-shadow-md' onSubmit={sendPost}>
                        <div className="w-full my-3 flex justify-start items-start flex-col">
                            <label htmlFor="title" className='text-xl font-semibold py-2 text-secondary'>Post Title</label>
                            <input type="text" name="title" placeholder="post title" className="py-3 w-full px-2 border-0 outline-none rounded-md" onChange={handleChange} value={formData.title} />
                        </div>

                        <div className="w-full my-3 flex justify-start items-start flex-col">
                            <label htmlFor="body" className='text-xl font-semibold py-2 text-secondary'>Post body</label>
                            <textarea name="body" placeholder="post body" className="py-4 overflow-hidden h-48 w-full px-2 border-0 outline-none rounded-md resize-none" onChange={handleChange} value={formData.body} ></textarea>
                        </div>


                        <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <>
                                    <label htmlFor="title" className='text-xl font-semibold py-2 text-secondary'>Post Image</label>
                                    <div {...getRootProps()} className="bg-white px-3 py-2 rounded-md drop-shadow mt-3">
                                        <input {...getInputProps()} className="bg-red-400" />
                                        <p className="text-xl text-secondary">Drag and drop images here, or click to select</p>
                                    </div>
                                </>
                            )}
                        </Dropzone>
                        <button type="submit" className='px-3 py-2  border-2 text-secondary rounded-md mt-4 text-xl'>
                            Update
                        </button>
                    </form>

                </div>

            </section>
        </>
    )
}

export default UpdatePost