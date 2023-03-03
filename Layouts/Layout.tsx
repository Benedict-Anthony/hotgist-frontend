import React from 'react'
import Header from './Header';
import Head from 'next/head';


type LayoutProps = {
    children: React.ReactNode,

}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Hot Gists</title>
                <meta name="description" content="Hot Gists" />
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <main className="container mx-auto w-100 bg-white px-4">
                <Header />

                {children}
            </main>
        </>
    )
}

export default Layout