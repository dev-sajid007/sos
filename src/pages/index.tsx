import { fetchData } from '@/components/actions/action';
import Banner from '@/components/essential/Banner';
import { GridLoader } from '@/components/ui/Loader';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Services = dynamic(() => import('@/components/essential/Services'), {
	loading: () => <GridLoader />,
	ssr: true,
});
const Organization = dynamic(
	() => import('@/components/essential/Organization'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const Counter = dynamic(() => import('@/components/essential/Counter'), {
	loading: () => <GridLoader />,
	ssr: true,
});
const ItServices = dynamic(() => import('@/components/essential/Itservices'), {
	loading: () => <GridLoader />,
	ssr: true,
});
const OrganizationProvide = dynamic(
	() => import('@/components/essential/OrganizationProvide'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const ChooseUs = dynamic(() => import('@/components/essential/ChooseUs'), {
	loading: () => <GridLoader />,
	ssr: true,
});
const Partners = dynamic(() => import('@/components/essential/Partners'), {
	loading: () => <GridLoader />,
	ssr: true,
});
const Pricing = dynamic(() => import('@/components/essential/Pricing'), {
	loading: () => <GridLoader />,
	ssr: true,
});

export const getServerSideProps = async () => {
	const settingsData = await fetchData('/api/settings');
	const getServiceData = await fetchData('/api/services');

	return {
		props: {
			settingsData,
			getServiceData,
		},
	};
};

export default function Home({ settingsData, getServiceData }: any) {
	return (
		<>
			<Head>
				<title>Home - SOS</title>
				<meta property="og:title" content="SOS-Home" key="SOS-Home" />
			</Head>
			<Banner settingsData={settingsData} />
			<Services settingsData={settingsData} getServiceData={getServiceData} />
			<Organization settingsData={settingsData} />
			<Counter settingsData={settingsData} />
			<ItServices settingsData={settingsData} />
			<OrganizationProvide settingsData={settingsData} />
			<ChooseUs settingsData={settingsData} />
			<Partners settingsData={settingsData} />
			<div className="pt-20">
				<Pricing />
			</div>
		</>
	);
}
