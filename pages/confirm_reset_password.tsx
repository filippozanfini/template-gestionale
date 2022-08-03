import Image from 'next/image'
import logo from '../app/logo.png'
import Button from '../components/core/Button'
import Input from '../components/FormInput'

const Home = () => {}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-16 w-full rounded bg-white  p-10 shadow md:w-1/2 lg:w-1/3'>
        <Image src={logo} />
        <p tabIndex={0} role='heading' aria-label='Area riservata' className='mb-4 text-2xl font-extrabold leading-6 text-gray-800'>
          Area riservata
        </p>
        <Input type='text' name='password_new' aria='nuova password' label='Nuova password' maxLength='25' />
        <div className='mt-8'>
          <Button className='w-full py-4' title='Invia' aria='invia nuova password' type='submit' />
        </div>
      </div>
    </div>
  )
}

export default Home
