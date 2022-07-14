import SidebarLayout from '../layouts/SidebarLayout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';

const Home: NextPageWithLayout = () => {
  return (
        <pre className="w-full h-full">
              Ciao ciao
        </pre>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout title="questo pagina è l'indice">
      {page}
    </SidebarLayout>
  )
}

export default Home
