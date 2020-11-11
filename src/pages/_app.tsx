import GlobalStyles from "../styles/GlobalStyles";
import { Title } from "../styles/pages/Home";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
