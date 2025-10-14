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
  {/* Meta Pixel Code */}
  <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2016999689056312');
fbq('track', 'PageView');` }} />
  <noscript>
    <img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=2016999689056312&ev=PageView&noscript=1" alt="" />
  </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
