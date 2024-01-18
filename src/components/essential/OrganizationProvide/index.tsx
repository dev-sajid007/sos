import Heading from '@/components/ui/Heading';
import style from './Organization.module.css';
import Image from 'next/image';
import { IconPickerItem } from 'react-fa-icon-picker';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { motion } from 'framer-motion';
import { GridLoader } from '@/components/ui/Loader';
import { BASE_URL } from '@/lib/env';

function OrganizationProvide({ settingsData }: any) {
	const data = settingsData.message;
	const imgUrl = BASE_URL;
	const [loading, setLoading] = useState(false);

	const [getOrTwoData, setGetOrTwoData] = useState<any>(null);
	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const res = await fetchData('/api/org-two');
			setGetOrTwoData(res);
			setLoading(false);
		};
		getData();
	}, []);

	return (
		<div className={style.org}>
			<div className="layout">
				{loading ? (
					<GridLoader />
				) : (
					<div className={`${style.orgWrap} flex-row-reverse`}>
						<div className={style.org__left}>
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
									h1={data.org_title}
									p={data.org_heading}
									center="left"
								/>
							</motion.div>
							<div className={style.orgItems}>
								{getOrTwoData?.message?.map((singleData: any, i: number) => (
									<motion.div
										initial={{ opacity: 0, y: 100 }}
										whileInView={{
											opacity: 1,
											transition: {
												duration: 0.6,
												delay: i * 0.1,
											},
											y: 0,
										}}
										className={style.orgItem}
										key={singleData.id}
									>
										<div className={style.icoBox}>
											<IconPickerItem
												icon={singleData?.icon}
												size={40}
												color="#1A77F2"
											/>
										</div>
										<div className={style.contents}>
											<h1 className={style.heading}>{singleData.title}</h1>
											<p className={style.subHeading}>
												{singleData.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 1,
									delay: 0.5,
								},
							}}
							className={style.imgBox}
						>
							{data?.org_one_photo && (
								<Image
									alt="Company-img"
									src={`${imgUrl}/${data?.org_one_photo}`}
									width={588}
									height={552}
								/>
							)}
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);
}

export default OrganizationProvide;
