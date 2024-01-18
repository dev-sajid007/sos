import Pricing from '@/components/essential/Pricing';
import style from '@/components/essential/AboutPage/ChooseUs/ChooseUs.style.module.css';
import Head from 'next/head';
// import { GetServerSideProps } from 'next';
// export const getServerSideProps: GetServerSideProps = async () => {
// 	const subscriptionsRes = await fetch(
// 		'https://sos.mdperves.com/api/subscriptions'
// 	);
// 	const subscriptions = await subscriptionsRes.json();

// 	return {
// 		props: {
// 			subscriptions: subscriptions,
// 		},
// 	};
// };
const PricingPage = () => {
	return (
		<>
			<Head>
				<title>Pricing - SOS</title>
				<meta property="og:title" content="SOS-Home" key="SOS-Home" />
			</Head>
			<div className={style.pricingPageSection}>
				<Pricing />
			</div>
		</>
	);
};

export default PricingPage;
