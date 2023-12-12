import Head from "next/head";

interface MetaTitleProps {
  title: string;
}

const MetaTitle: React.FC<MetaTitleProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default MetaTitle;
