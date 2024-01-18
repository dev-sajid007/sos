import { GetServerSideProps } from 'next';
import { fetchData, useDebounce } from '@/components/actions/action';

import dynamic from 'next/dynamic';
import { GridLoader } from '@/components/ui/Loader';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AllServices = dynamic(
	() => import('@/components/essential/ServicePage/AllServices/AllServices'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const ServiceBanner = dynamic(
	() =>
		import('@/components/essential/ServicePage/ServiceBanner/ServiceBanner'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);

export const getServerSideProps: GetServerSideProps = async () => {
	const getSettingsData = await fetchData('/api/settings');
	const getServiceData = await fetchData('/api/all-services');
	const category = await fetchData('/api/service-category');

	return {
		props: {
			getSettingsData,
			getServiceData,
			category: category?.message,
		},
	};
};
const Service = ({ getSettingsData, getServiceData, category }: any) => {
	const router = useRouter();
	const { tags } = router.query;
	const [page, setPage] = useState('');
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [categoryId, seCategoryId] = useState('');
	const [getTags, setTags] = useState<any>('');
	const [serviceData, setServiceData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { searchHandler } = useDebounce(setSearch, setPage);

	// Function to fetch data for the current page.
	const fetchDataForPage = async () => {
		setIsLoading(true);
		// api/all-services?tags=Ipsum & category_id = 2 & type = [latest,best_selling,avg_rating,default] & search = ????..
		const api = `/api/all-services?page=${page}&category_id=${categoryId}&type=${sortBy}&search=${search}&tags=${getTags}`;

		const newServiceData = await fetchData(api);
		// const newServiceData = await fetchData(`/api/all-services?page=${page}`);
		// router.push('/services#our-service');
		setServiceData(newServiceData);
		setIsLoading(false);
	};

	// Call fetchDataForPage when the component mounts or currentPage changes.
	useEffect(() => {
		fetchDataForPage();
		if (tags) {
			setTags(tags);
			router.replace({ query: {} }, undefined, { shallow: true });
		}
	}, [page, search, sortBy, categoryId, getTags, tags]);
	return (
		<>
			<Head>
				<title>Service - SOS</title>
				<meta property="og:title" content="SOS-Service" key="SOS-Service" />
			</Head>
			<ServiceBanner
				getSettingsData={getSettingsData}
				searchHandler={searchHandler}
				setPage={setPage}
			/>
			<AllServices
				getServiceData={getServiceData}
				serviceData={serviceData}
				isLoading={isLoading}
				page={page}
				search={search}
				sortBy={sortBy}
				categoryId={categoryId}
				getTags={getTags}
				tags={tags}
				setPage={setPage}
				seCategoryId={seCategoryId}
				setSortBy={setSortBy}
				setSearch={setSearch}
				setTags={setTags}
				category={category}
			/>
		</>
	);
};

export default Service;
