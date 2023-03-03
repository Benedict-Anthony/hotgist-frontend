import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AxionsInstance } from '@/utils/axios';
import { useRouter } from 'next/router';

type formProps = {
    email?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    comfirm_password?: string
}
type values = formProps


const SignUp = () => {
    const router = useRouter()
    const signUpUser = async (values: values) => {
        try {
            const response = await AxionsInstance.post("/user/auth/", values)
            if (response.status === 404 || response.status === 400) {
                throw new Error("something went wrong")
            } else {

                console.log(response.data);
                router.push("/signIn")
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <section className='md:px-10 w-full mx-auto flex justify-center items-center h-full '>
            <div className="w-full md:w-[30rem]">
                <h1 className='text-2xl mb-4 text-red-400 md:font-semibold'>Sign Up for an account</h1>

                <Formik
                    initialValues={{ first_name: "", last_name: "", email: '', password: '', comfirm_password: "" }}
                    validate={values => {
                        const errors: { email?: string, password?: string, first_name?: string, last_name?: string, comfirm_password?: string } = {};
                        if (!values.email) {
                            errors.email = 'This field is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        } else if (!values.first_name) {
                            errors.first_name = 'This field is required';
                        } else if (!values.last_name) {
                            errors.last_name = 'This field is required';
                        } else if (!values.password) {
                            errors.password = 'This field is required';
                        } else if (values.password.length < 6) {
                            errors.password = 'Password must be at least 6 characters';
                        } else if (values.comfirm_password !== values.password) {
                            errors.comfirm_password = 'Password does not match';
                        }


                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        signUpUser(values)
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='bg-gray-300 px-4 py-2 w-full rounded-sm drop-shadow-md'>
                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="first_name" className='text-xl font-semibold py-2 text-secondary'>First Name</label>
                                <ErrorMessage name="first_name" component="div" className='text-red-400' />
                                <Field type="text" name="first_name" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>

                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="last_name" className='text-xl font-semibold py-2 text-secondary'>Last Name</label>
                                <ErrorMessage name="last_name" component="div" className='text-red-400' />
                                <Field type="text" name="last_name" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>

                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="email" className='text-xl font-semibold py-2 text-secondary'>Email</label>
                                <ErrorMessage name="email" component="div" className='text-red-400' />
                                <Field type="email" name="email" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>

                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="password" className='text-xl font-semibold py-2 text-secondary'>Password</label>
                                <ErrorMessage name="password" component="div" className='text-red-400' />
                                <Field type="password" name="password" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>

                            <div className="w-full my-3 flex justify-start items-start flex-col">
                                <label htmlFor="comfirm_password" className='text-xl font-semibold py-2 text-secondary'>Comfirm Password</label>
                                <ErrorMessage name="comfirm_password" component="div" className='text-red-400' />
                                <Field type="password" name="comfirm_password" className="py-2 w-full px-2 border-0 outline-none rounded-md" />
                            </div>
                            <button type="submit" disabled={isSubmitting} className='px-3 py-2  border-2 text-secondary rounded-md mt-4 text-xl'>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default SignUp
