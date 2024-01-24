import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";
import Header from "@/components/gnb/Gnb";

export default function Home() {
  return (
    <>
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
      </main>
    </>
  );
}
