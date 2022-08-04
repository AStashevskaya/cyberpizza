import React from 'react'
// import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
// import DefaultErrorPage from 'next/error'
// import Head from 'next/head'
import config from '../../config'
import { useRouter } from '../hooks'
// Replace with your Public API Key
builder.init(config.apiKey)

export async function getStaticProps({ params }) {
  // Fetch the builder content
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
    })
    .toPromise()

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  // Get a list of all pages in builder
  const pages = await builder.getAll('page', {
    // We only need the URL field
    fields: 'data.url',
    options: { noTargeting: true },
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Page({ page }) {
  //   const router = useRouter()
  //   console.log('router', router)
  //   const isPreviewing = useIsPreviewing()
  const isPreviewing = true

  //   if (router.isFallback) {
  //     return <h1>Loading...</h1>
  //   }

  if (!page && !isPreviewing) {
    return <div>no page</div>
  }
  const data = { products: [] }

  return (
    <>
      {/* <Head>
        <title>{page?.data.title}</title>
      </Head> */}
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page} data={data} />
    </>
  )
}
