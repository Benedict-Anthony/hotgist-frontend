import React, { useState } from 'react'
import { AxionsInstance } from '@/utils/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import router from 'next/router';
import Dropzone from 'react-dropzone';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/router';
import { baseUrl, userInstance } from '@/utils/userInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type postProps = {
  title: string
  body: string
  tags: number[]
  slug: string
}
type post = postProps

const Index = () => {

  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<any>([])


  const sendPost = async (post: post) => {
    const token = JSON.parse(localStorage.getItem("token") as any)
    const user: any = jwtDecode(token.access)
    if (!files) {
      setError("selct an image for your post")
      return;
    }
    const data = {
      author: user.user_id,
      title: post.title,
      body: post.body,
      tags: post.tags,
      slug: post.slug,
      image: files[0],
      related_images: {
        image: files[2]
      }
    }

    try {
      const response = await userInstance("post", "posts/admin/mutate", data, "multipart/form-data")
      if (response.statusText === "OK" || response.status === 201) {
        toast("Post Succesful")
        router.push("/admin")
      }
      else {
        throw new Error()
      }

    } catch (error) {
      setError("Post with same title already exist!")
      console.log(error)
    }


  }


  return (
    <>
      <ToastContainer />
      <section className='md:px-10 w-full mx-auto flex justify-center items-center mt-4'>
        <div className="w-full md:w-[30rem]">
          <h1 className='text-2xl mb-4 py-3 text-red-400 md:font-semibold'>Make a new post</h1>

          <Formik
            initialValues={{ title: "", body: "", tags: [1], slug: "" }}
            validate={values => {
              const errors: { title?: string, body?: string } = {};
              if (!values.title) {
                errors.title = 'This field is required';
              } else if (values.body.length < 10) {
                errors.body = 'posts content should be more 20 characters';
              }
              return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
              sendPost(values)
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className='bg-gray-300 px-4 py-5 w-full rounded-sm drop-shadow-md'>
                <div className="text-red-400">{error}</div>


                <div className="w-full my-3 flex justify-start items-start flex-col">
                  <label htmlFor="title" className='text-xl font-semibold py-2 text-secondary'>Post Title</label>
                  <ErrorMessage name="title" component="div" className='text-red-400' />
                  <Field type="text" name="title" placeholder="post title" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                </div>

                <div className="w-full my-3 flex justify-start items-start flex-col">
                  <label htmlFor="body" className='text-xl font-semibold py-2 text-secondary'>Post body</label>
                  <ErrorMessage name="body" component="div" className='text-red-400' />
                  <Field type="text" as="textarea" name="body" placeholder="post body" className="py-4 overflow-hidden h-48 w-full px-2 border-0 outline-none rounded-md resize-none" />
                </div>


                <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles)}>


                  {({ getRootProps, getInputProps }) => (
                    <>
                      <label htmlFor="title" className='text-xl font-semibold py-2 text-secondary'>Post Image</label>
                      <div {...getRootProps()} className="bg-white cursor-pointer px-3 py-2 rounded-md drop-shadow mt-3">
                        <input {...getInputProps()} className="bg-red-400" />
                        <p className="text-xl text-secondary">Drag and drop images here, or click to select</p>
                      </div>
                    </>
                  )}
                </Dropzone>

                <button type="submit" disabled={isSubmitting} className='px-3 py-2  border-2 text-secondary rounded-md mt-4 text-xl'>
                  Post
                </button>
              </Form>
            )}
          </Formik>
        </div>

      </section>
    </>
  )
}

export default Index