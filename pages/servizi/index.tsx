import SidebarLayout from '../../layouts/SidebarLayout';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { mpApi } from '../../lib/mpApi';
import ActionList from '../../components/ActionList';
import {useRouter} from 'next/router';


const IndiceServizi: NextPageWithLayout = () => {
  const  router = useRouter();
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR(mpApi.services.routes.list(), mpApi.services.actions.listFetcher );
  return (<ActionList items={data}
               onEditAction={ (item) => router.push(`/servizi/edit?id=${item.id}`) }
             onDeleteAction={ (item) => mpApi.services.actions.delete(Number(item.id)).finally(()=> mutate(mpApi.services.routes.list()) ) } />)
}

IndiceServizi.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout title="Servizi">
      {page}
    </SidebarLayout>
  )
}

export default IndiceServizi
