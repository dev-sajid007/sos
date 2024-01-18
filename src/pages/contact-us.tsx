import { fetchData } from '@/components/actions/action';
import { GridLoader } from '@/components/ui/Loader';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Contact = dynamic(
	() => import('@/components/essential/Contact/Contact'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);

export const getServerSideProps = async () => {
	const data = await fetchData('/api/contact-page-data');

	return {
		props: {
			data,
		},
	};
};
const ContactUs = ({ data }: any) => {
	return (
		<>
			<Head>
				<title>Contact - SOS</title>
				<meta property="og:title" content="SOS-Contact" key="SOS-Contact" />
			</Head>
			<Contact data={data} />
		</>
	);
};

export default ContactUs;
