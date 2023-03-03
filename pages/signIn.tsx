import React, { useState } from 'react'
import { AxionsInstance } from '@/utils/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import router from 'next/router';


const SignIN = () => {
    const [error, setError] = useState<string | null>(null)
    const signInUser = async (values: { email: string, password: string }) => {
        try {
            const response = await AxionsInstance.post("/user/login/", values)
            if (response.status === 401) {
                setError("No user found with such credentials")
                throw new Error("something went wrong")
            } else {
                localStorage.setItem("token", JSON.stringify(response.data))
                router.push("/admin")
            }
        } catch (error) {
            setError("Email or Passoword is incorect")

        }
    }
    return (
        <section className='md:px-10 w-full mx-auto flex justify-center items-center mt-4'>
            <div className="w-full md:w-[30rem]">
                <h1 className='text-2xl mb-4 py-3 text-red-400 md:font-semibold'>Login to continue</h1>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors: { email?: string, password?: string } = {};
                        if (!values.email) {
                            errors.email = 'This field is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        signInUser(values)
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='bg-gray-300 px-4 py-5 w-full rounded-sm drop-shadow-md'>
                            <div className="text-red-400">{error}</div>
                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="email" className='text-xl font-semibold py-2 text-secondary'>Email</label>
                                <ErrorMessage name="email" component="div" className='text-red-400' />
                                <Field type="email" name="email" placeholder="Email" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>
                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="password" className='text-xl font-semibold py-2 text-secondary'>Password</label>
                                <ErrorMessage name="password" component="div" className='text-red-400' />
                                <Field type="password" name="password" placeholder="password" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>
                            <button type="submit" disabled={isSubmitting} className='px-3 py-2  border-2 text-secondary rounded-md mt-4 text-xl'>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

        </section>
    )
}

export default SignIN




    ;