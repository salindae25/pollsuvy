import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = (props: any) => {
  const { data, isLoading } = trpc.useQuery(["getAllPolls"])
  if (isLoading || !data) {
    return <div>Loading</div>
  }

  console.log(data)
  return (
    < >
      <Head>
        <title>Poll Survey</title>
        <meta name="description" content="Survey solution for your all polls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex w-screen px-20 min-h-screen'>
        <h3 className='text-bold text-3xl mx-auto'>Get opinion via polling</h3>
      </div>
    </>)

}




export default Home
