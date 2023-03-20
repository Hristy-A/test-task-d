import { Roboto } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import themeConfig from '@/themeConfig';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '300'],
});

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={themeConfig}>
    <GlobalStyle />
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  </ThemeProvider>
);

export default App;
