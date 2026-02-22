import "../styles/globals.css";
import Head from "next/head";
import MouseGlow from "../components/MouseGlow";

//INTERNAL IMPORT
import { CONTEXT_Provider } from "../context/index";
import toast, { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AMERO X Airdrop - Next-Generation Blockchain with Hybrid DEX &amp; Trading Platform</title>
        <meta name="description" content="Trade, swap, provide liquidity, earn rewards, copy expert traders, and explore futures — all in one unified Web3 portal." />

        {/* Open Graph / Facebook / WhatsApp / Telegram */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="airdrop.amerox.io" />
        <meta property="og:site_name" content="Amerox.io" />
        <meta property="og:title" content="AMERO X Airdrop - Next-Generation Blockchain with Hybrid DEX & Trading Platform" />
        <meta property="og:description" content="Trade, swap, provide liquidity, earn rewards, copy expert traders, and explore futures — all in one unified Web3 portal." />
        <meta property="og:image" content="https://airdrop.amerox.io/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="airdrop.amerox.io" />
        <meta name="twitter:title" content="AMERO X Airdrop - Next-Generation Blockchain with Hybrid DEX & Trading Platform" />
        <meta name="twitter:description" content="Trade, swap, provide liquidity, earn rewards, copy expert traders, and explore futures — all in one unified Web3 portal." />
        <meta name="twitter:image" content="https://airdrop.amerox.io/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/amerox-logo.png" />
        <link rel="apple-touch-icon" href="/amerox-logo.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <div className="circuit-background"></div>
      <img src="assets/img/brand/logo.png" alt="" className="large-bg-coin" />
      <CONTEXT_Provider>
        <MouseGlow />
        <Component {...pageProps} />
      </CONTEXT_Provider>
      <Toaster />

      <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
      <script src="assets/js/bootstrap.min.js"></script>
      <script src="assets/js/jquery.countdown.min.js"></script>
      <script src="assets/js/jquery.appear.js"></script>
      <script src="assets/js/slick.min.js"></script>
      <script src="assets/js/ajax-form.js"></script>
      <script src="assets/js/jquery.easing.js"></script>
      <script src="assets/js/chart.min.js"></script>
      <script src="assets/js/custom-chart.js"></script>
      <script src="assets/js/wow.min.js"></script>
      <script src="assets/js/main.js"></script>
    </>
  );
}
