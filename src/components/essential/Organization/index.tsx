import Heading from '@/components/ui/Heading';
import style from './Organization.module.css';
import Image from 'next/image';
import { ICON } from '@/lib/img';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { motion } from 'framer-motion';
import { YoutubeModal } from '@/components/ui/modal';
import { GridLoader } from '@/components/ui/Loader';
import { BASE_URL } from '@/lib/env';

function Organization({ settingsData, reverse = false }: any) {
	const [play, setPlay] = useState(false);
	const [loading, setLoading] = useState(false);
	const data = settingsData.message;
	const [getOrgOneData, setGetOrgOneData] = useState<any>(null);
	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const res = await fetchData('/api/org-one');
			setGetOrgOneData(res);
			setLoading(false);
		};
		getData();
	}, []);
	const orgData = getOrgOneData?.message;
	const imgUrl = BASE_URL;

	return (
		<div className={style.org}>
			<div className="layout">
				{loading ? (
					<GridLoader />
				) : (
					<div className={`${style.orgWrap} ${reverse && 'flex-row-reverse'}`}>
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
									h1={data.org_one_heading}
									p={data.org_one_title}
									center="left"
								/>
							</motion.div>
							<div className={style.orgRules}>
								{orgData?.map((singleData: any, i: number) => (
									<motion.div
										initial={{ opacity: 0, y: 100 }}
										whileInView={{
											opacity: 1,
											transition: {
												duration: 0.5,
												delay: i * 0.1,
											},
											y: 0,
										}}
										className={style.rulesList}
										key={singleData.id}
									>
										<Image alt="icon" src={ICON.check} />
										<p className={style.ruleTxt}>{singleData.description}</p>
									</motion.div>
								))}
							</div>

							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: 0.2,
									},
								}}
								className={style.howItWork}
							>
								<label
									onClick={() => setPlay((e) => !e)}
									htmlFor="my_modal_6"
									style={{ cursor: 'pointer' }}
								>
									<ICON.play className={style.playIcon} />
								</label>
								<p
									onClick={() => setPlay((e) => !e)}
									className={style.howIiTxt}
								>
									How It Works?
								</p>
							</motion.div>
							{play && (
								<YoutubeModal
									link={data?.org_one_video_link}
									setPlay={setPlay}
								/>
							)}
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
							{data?.org_photo && (
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

export default Organization;
