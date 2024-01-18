import { BASE_URL } from '@/lib/env';
import style from './KeyMembers.style.module.css';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { GridLoader } from '@/components/ui/Loader';
import { motion } from 'framer-motion';

const KeyMembers = ({ getSettingsData }: any) => {
	const settingData = getSettingsData?.message;

	const [getMembersData, setGetMembersData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getData = async () => {
			const res = await fetchData('/api/members');
			setGetMembersData(res);
			setLoading(false);
		};
		getData();
	}, []);
	const data = getMembersData?.message;

	return (
		<section className={style.keyMembersSection}>
			<div className="layout">
				<motion.h4
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							delay: 0.2,
							duration: 0.5,
						},
					}}
					className={style.memberTopHeader}
				>
					{settingData?.member_title}
				</motion.h4>
				<motion.h1
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							delay: 0.25,
							duration: 0.5,
						},
					}}
					className={style.memberHeader}
				>
					{settingData?.member_heading}
				</motion.h1>
				{loading ? (
					<GridLoader />
				) : (
					<div className={style.keyMembers}>
						{data?.map((singleData: any, i: number) => (
							<motion.div
								whileHover={{
									scale: 1.1,
									transition: { duration: 0.3 },
								}}
								whileTap={{ scale: 0.9 }}
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: i * 0.13,
										duration: 0.5,
									},
								}}
								className={style.singleMember}
								key={singleData?.id}
							>
								<Image
									className={style.memberImage}
									src={`${BASE_URL}/${singleData?.photo}`}
									alt="Member Image"
									width={310}
									height={231}
								/>
								<div className={style.memberContent}>
									<div>
										<h2 className={style.singleMemberName}>
											{singleData.name}
										</h2>
										<p className={style.singleMemberTitle}>
											{singleData.designation}
										</p>
										<div className={style.socialMedia}>
											<a target="_black" href={singleData.facebook_link}>
												<FaFacebookF className={style.socialIcon} />
											</a>
											<a target="_black" href={singleData.instagram_link}>
												<FaInstagram className={style.socialIcon} />
											</a>
											<a target="_black" href={singleData.twitter_link}>
												<FaTwitter className={style.socialIcon} />
											</a>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default KeyMembers;
