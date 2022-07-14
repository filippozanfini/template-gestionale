import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html className="h-full bg-gray-50">
        <Head />
        <body className='h-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document