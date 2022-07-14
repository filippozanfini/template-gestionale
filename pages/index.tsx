import SidebarLayout from '../layouts/SidebarLayout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';

const Home: NextPageWithLayout = () => {



  return (
        <pre className="w-full h-full">

        </pre>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  )
}

export default Home
