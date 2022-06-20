import { AppProps } from "next/app"
import { Web3ReactProvider } from "@web3-react/core"
import Web3 from "web3"
import { ethers } from "ethers"
import Layout from "layout"
import "antd/dist/antd.css"
import "styles/globals.css"
import { Toaster } from "react-hot-toast"

import "vendor/index.scss"
import "vendor/home.scss"

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.API_ENDPOINT,
  }),
  cache: new InMemoryCache(),
})

function App({ Component, router }: AppProps) {
  const getLibrary = (provider) => {
    // const library = new ethers.providers.Web3Provider(provider)
    // library.pollingInterval = 8000 // frequency provider is polling
    const library = new Web3(provider)
    return library
  }

  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout
          router={router}
          networks={process.env.APP_ENV === "dev" ? [97] : [56]}
        >
          <Component />
        </Layout>
      </Web3ReactProvider>
      <Toaster />
    </ApolloProvider>
  )
}

export default App
