import React from 'react'
import Script from 'next/script'
import Head from 'next/head'
import Link from 'next/link'


export default function Step1() {
    return (
        <>
        <Head>
            <title>Twitter</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
        </Head>  
        <Script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous" /> 
        <div className='container-lg'>
         <nav className='row row-cols-2 bg-primary'>
            <div className='col-1'>
              <Link type="button" className="btn-close" href='/'></Link>
            </div>
            
            <div className='col-auto'>
              <p>Step 1 of 2</p>
            </div>
         </nav>
         <div className='col gy-2'>
          <form noValidate>
            <h1 className='header'>Create your account</h1>
            <div className='form-floating'>
              <input type='text' id='name' className='form-control' placeholder='Name' required></input>
              <label for='text'>Name</label>
              <div className='valid-feedback'>Valid</div>
              <div className='invalid-feedback'>Invalid</div>
            </div>
            
            <div className='form-floating'>
              <input type='email' className='form-control' placeholder='Email' required></input>
              <label for='email'>Email</label>
              <div className='valid-feedback'>Valid</div>
              <div className='invalid-feedback'>Invalid</div>
            </div>

            <div className='col'>

              <h3>Date of birth</h3>
              <p>Confirm your age, please. This information will not be shown publicly</p>
              <div className='row row-cols-3 g-1'>
                <input className='col' type='month' placeholder='Month' required></input>
                {/* <input className='col' type='day' placeholder='Day'></input>
                <input className='col' type='year' placeholder='Year'></input> */}
              </div>

            </div>

            <button>Submit</button>
          </form>
         </div>
      </div>
      {/*Form validation innext,js*/}
      </>
    )
}