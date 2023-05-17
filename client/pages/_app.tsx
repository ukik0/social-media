import '@/styles/globals.scss';
import NextNProgress from 'nextjs-progressbar';
import 'styles/editor.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { Montserrat } from '@next/font/google';
import { AppProps } from 'next/app';

import { SessionChecker } from '@/components';

import { PaginationPostState } from '@/context';

const montserrat = Montserrat({ subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false
                    }
                }
            })
    );

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${montserrat.style.fontFamily};
                }
            `}</style>

            <NextNProgress
                color='#f3f3f3'
                startPosition={0.3}
                stopDelayMs={200}
                height={1}
                showOnShallow={true}
                options={{ showSpinner: false, trickle: true }}
            />
            <QueryClientProvider client={queryClient}>
                <SessionChecker>
                    <PaginationPostState>
                        <Component {...pageProps} className={montserrat.className} />
                        <Toaster
                            position='top-center'
                            reverseOrder={true}
                            toastOptions={{
                                icon: '🔥',
                                style: {
                                    borderRadius: '8px',
                                    background: 'rgb(20, 20, 20)',
                                    color: '#f3f3f3',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                },
                                duration: 1000 * 3.5
                            }}
                        />
                    </PaginationPostState>
                </SessionChecker>
            </QueryClientProvider>
        </>
    );
};

export default MyApp;
