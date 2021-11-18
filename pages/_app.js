import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Groceries</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
