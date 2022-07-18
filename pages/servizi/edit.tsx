import SidebarLayout from '../../layouts/SidebarLayout';
import { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mpApi } from '../../lib/mpApi';
import useSWR from 'swr';
import FormInput from '../../components/FormInput';
import Debugger from '../../components/Debugger';
import ComboBox from '../../components/ComboBox';

const EditServizi: NextPageWithLayout = () => {
  const route = useRouter();
  const { data, error } = useSWR(mpApi.services.routes.item( Number(route.query.id) || "new") );

  const [servizio, setServizio] = useState({});

  useEffect( () => {
    setServizio({...data });
  }, [data]);

  return (<form className="space-y-8 divide-y divide-gray-200">
  <div className="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-500">

<Debugger data={data} />

        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

        <FormInput className="sm:col-span-3" autoComplete='first-name' name="first-name" aria="Inserisci il nome" label='Nome' value={servizio?.nome} />

        <div className="sm:col-span-3">
          <FormInput name="password" aria="password" label='password' />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">

        </div>

        <div className="sm:col-span-6">
          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
            Street address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
            State / Province
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
            ZIP / Postal code
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              autoComplete="postal-code"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="pt-5">
    <div className="flex justify-end">
      <button
        type="button"
        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
</form>)
}

EditServizi.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout title="Servizi">
      {page}
    </SidebarLayout>
  )
}

export default EditServizi
