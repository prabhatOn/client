
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <div className='bg-neutral-50 min-h-screen'>
        <Component {...pageProps} />
      </div>
      <Analytics />
      <SpeedInsights />
    </MainLayout>
  );
}

export default MyApp;
