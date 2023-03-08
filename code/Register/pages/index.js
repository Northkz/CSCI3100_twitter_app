import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import React from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
       <title>Twitter</title>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link> 
      </Head>
      <body className='btn-group btn-group-centered'>
        <Link className='btn btn-light hover' href='/Step1'>Register</Link>
        <Link className='btn btn-light hover' href='/Step1'>Login</Link>
      </body>
    </>
  )
}
