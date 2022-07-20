import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import  logo  from "../app/logo.png";
import Button from '../components/Button';
import Input from "../components/FormInput";
import FormPasswordInput from '../components/Password';
import fetchJson, { FetchError } from '../lib/fetchJson';
import { mpApi } from '../lib/mpApi';
import useUser from '../lib/useUser';
import { User } from '../types/User'

const Login: NextPage = () => {

  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault()

          try {
            mutateUser( (await mpApi.user.actions.login(event.currentTarget.username.value, event.currentTarget.password.value)) as User )
          } catch (error) {
            if (error instanceof FetchError) {
              setErrorMsg(error.data.message)
            } else {
              console.error('An unexpected error happened:', error)
            }
          }
  };

      return (
        <form className="h-screen bg-gradient-to-tl from-green-400 to-primary-900 w-full py-16 px-4" onSubmit={handleSubmit} >
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                    <Image src={logo} />
                    <p tabIndex={0} role="heading" aria-label="Area riservata" className="text-2xl font-extrabold leading-6 text-gray-800 mb-4">
                        Area riservata
                    </p>

                    <Input type="text" name="username" aria="inserisci la username" label="Username"                            />
                    <FormPasswordInput name="password" aria="inserisci la password" label='Password' className="mt-6  w-full" />

                    <div className="mt-8">
                        <Button className='py-4 w-full' title='Login' aria='Premi per effettuare il login' type='submit'/>
                    </div>
                </div>
            </div>
        </form>
      );
    };
export default Login
