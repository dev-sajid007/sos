import style from './style.module.css';
import { useRouter } from 'next/router';
import 'react-tabs/style/react-tabs.css';
import { USER } from '@/all-api/auth-headers';
import { fetchData } from '@/components/actions/action';

import Head from 'next/head';
import { GridLoader } from '@/components/ui/Loader';
import dynamic from 'next/dynamic';
import { NotFoundComponents } from '@/components/ui/NotFound';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeadingOfSD = dynamic(
	() =>
		import('@/components/essential/ServiceDetails/heading-of-service-details'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const ServiceOfDetails = dynamic(
	() => import('@/components/essential/ServiceDetails/service-of-details'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const SliderOfSD = dynamic(
	() =>
		import('@/components/essential/ServiceDetails/slider-of-service-details'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
const TabOfSD = dynamic(
	() => import('@/components/essential/ServiceDetails/tab-of-service-details'),
	{
		loading: () => <GridLoader />,
		ssr: true,
	}
);
export async function getServerSideProps(context: any) {
	const { params } = await context;
	const { id } = await params;
	const data = await fetchData(`/api/services-view/${id[0]}`);
	return {
		props: { data },
	};
}

const ServiceDetails = ({ data }: any) => {
	const user = USER();
	const router = useRouter();

	const buyPackage = async (orderInfo: any) => {
		if (user?.token) {
			return router.push(
				`/serviceCheckout/${orderInfo?.vendor_service_id}/${orderInfo?.service_package_id}/${orderInfo?.price}`
			);
		}
		return router.push('/login');
	};

	// back button
	// const handleBackButtonClick = () => {
	// 	router.back(); // This will navigate to the previous route
	// 	window.scrollTo(0, 0);
	// };

	return (
		<>
			<Head>
				<title>Service Details - SOS</title>
				<meta
					property="og:title"
					content="SOS-Service Details"
					key="SOS-Service Details"
				/>
			</Head>

			<section className={style.servicesDetails}>
				<div className="layout">
					{data.data === 'fail' ? (
						<NotFoundComponents />
					) : (
						<div className={style.servicesDetailsWp}>
							<div className={style.servicesdetailsSlider}>
								{/* <motion.button
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											delay: 0.1,
											duration: 0.5,
										},
									}}
									type="button"
									onClick={handleBackButtonClick}
									className={
										'border-blue-500 border-2 px-8 rounded bg-blue-700 text-white '
									}
								>
									Back
								</motion.button> */}
								<HeadingOfSD data={data} />
								<SliderOfSD data={data} />
								<ServiceOfDetails data={data} />
							</div>
							<TabOfSD buyPackage={buyPackage} data={data} />
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default ServiceDetails;
