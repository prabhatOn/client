import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/dp-logo.jpg" />
        <link rel="shortcut icon" href="/dp-logo.jpg" />
        <link rel="apple-touch-icon" href="/dp-logo.jpg" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="DP Enterprises - Authorized Channel Partners of Milton Roy for industrial pumping solutions in Madhya Pradesh, Chhattisgarh & Vidharbha." />
        <meta name="keywords" content="Milton Roy, dosing pumps, industrial pumps, water treatment, chemical processing, DP Enterprises" />
        <meta name="author" content="DP Enterprises" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="DP Enterprises - Milton Roy Industrial Pumps" />
        <meta property="og:description" content="Authorized Channel Partners of Milton Roy for industrial pumping solutions" />
        <meta property="og:image" content="/dp-logo.jpg" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="DP Enterprises - Milton Roy Industrial Pumps" />
        <meta name="twitter:description" content="Authorized Channel Partners of Milton Roy for industrial pumping solutions" />
        <meta name="twitter:image" content="/dp-logo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
