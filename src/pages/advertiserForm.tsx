import MultipartForm from '@/components/essential/Forms/multipart-form/MultipartForm';
import Head from 'next/head';

export default function AdvertiseForm() {
	return (
		<>
			<Head>
				<title>Advertise Form - SOS</title>
				<meta
					property="og:title"
					content="SOS-Advertise Form"
					key="SOS-Advertise Form"
				/>
			</Head>
			<MultipartForm />
		</>
	);
}
