import { GetServerSideProps } from 'next';
import { fetchData } from '@/components/actions/action';
import dynamic from 'next/dynamic';
import { GridLoader } from '@/components/ui/Loader';
import Head from 'next/head';

const OurCompany = dynamic(
	() => import('@/components/essential/AboutPage/OurCompany/OurCompany'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const OurVision = dynamic(
	() => import('@/components/essential/AboutPage/OurVission/OurVission'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const OurMission = dynamic(
	() => import('@/components/essential/AboutPage/OurMission/OurMission'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const ChooseUs = dynamic(
	() => import('@/components/essential/AboutPage/ChooseUs/ChooseUs'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const KeyMembers = dynamic(
	() => import('@/components/essential/AboutPage/KeyMembers/KeyMembers'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const FeedbackSlider = dynamic(
	() =>
		import('@/components/essential/AboutPage/FeedbackSlider/FeedbackSlider'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
export const getServerSideProps: GetServerSideProps = async () => {
	const getSettingsData = await fetchData('/api/settings');

	return {
		props: {
			getSettingsData,
		},
	};
};

const About = ({ getSettingsData }: any) => {
	return (
		<>
			<Head>
				<title>About Us - SOS</title>
				<meta property="og:title" content="SOS-Home" key="SOS-Home" />
			</Head>
			<OurCompany getSettingsData={getSettingsData} />
			<OurVision getSettingsData={getSettingsData} />
			<OurMission getSettingsData={getSettingsData} />
			<ChooseUs getSettingsData={getSettingsData} />
			<FeedbackSlider getSettingsData={getSettingsData} />
			<KeyMembers getSettingsData={getSettingsData} />
		</>
	);
};
export default About;
