import Heading from '@/components/ui/Heading';
import style from './itService.module.css';
import Image from 'next/image';
import { ICON } from '@/lib/img';
import { IconPickerItem } from 'react-fa-icon-picker';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { motion } from 'framer-motion';
import { GridLoader } from '@/components/ui/Loader';
function ItServices({ settingsData }: any) {
	const data = settingsData?.message;

	const [getItServiceData, setGetItServiceData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getData = async () => {
			const res = await fetchData('/api/it-services');
			setGetItServiceData(res);
			setLoading(false);
		};
		getData();
	}, []);

	const itService = getItServiceData?.message;
	return (
		<section className={style.itService}>
			<div className="layout">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.2,
						},
					}}
				>
					<Heading
						h1={data.service_two_title}
						p={data.service_two_heading}
						center="center"
					/>
				</motion.div>

				{loading ? (
					<GridLoader />
				) : (
					<div className={style.ServicesCardWrap}>
						{itService?.map((singleData: any, i: number) => (
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: i === 1 ? 0.2 : i === 0 ? 0.4 : i * 0.2,
									},
								}}
								className={style.wrap}
								key={singleData.id}
							>
								<div className={style.icon}>
									<Image alt="icon" src={ICON.blue} className={style.ico} />
									<div className={style.serviceIcon}>
										<IconPickerItem
											className={style.serviceOneIcon}
											icon={singleData?.icon}
											size={40}
										/>
									</div>
								</div>
								<h1 className={style.text}>{singleData.title}</h1>
								<p className={style.paragraph}>{singleData.description}</p>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export default ItServices;
