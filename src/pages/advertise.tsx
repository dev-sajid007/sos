import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { fetchData } from '@/components/actions/action';

import dynamic from 'next/dynamic';
import { GridLoader } from '@/components/ui/Loader';

const AdvertiseBanner = dynamic(
	() =>
		import(
			'@/components/essential/AdvertisePage/AdvertiseBanner/AdvertiseBanner'
		),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const SosAdvertise = dynamic(
	() =>
		import(
			'@/components/essential/AdvertisePage/SosAdvertise/SosAdvertiseSection'
		),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
export const getServerSideProps: GetServerSideProps = async () => {
	const getSettingData = await fetchData('/api/settings');

	return {
		props: {
			getSettingData,
		},
	};
};

export default function Advertise({ getSettingData }: any) {
	return (
		<>
			<Head>
				<title>Advertise - SOS</title>
				<meta property="og:title" content="SOS-Home" key="SOS-Home" />
			</Head>
			<AdvertiseBanner getSettingData={getSettingData} />
			<SosAdvertise getSettingData={getSettingData} />
		</>
	);
}
