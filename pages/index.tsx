import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";
import Header from "@/components/gnb/Gnb";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Header />
        <main></main>
        <Footer />
      </body>
    </>
  );
}
