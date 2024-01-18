import BtnLink from '@/components/ui/BtnLink';
import style from './banner.style.module.css';
import { ICON } from '@/lib/img';
import Image from 'next/image';
// import { useWebDataQuerimport { motion } from "framer-motion" } from "@/store/feature/api/webDataAPI";
import { motion } from 'framer-motion';
function Banner({ settingsData }: any) {
	const data = settingsData.message;

	return (
		<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
			<section className={style.banner}>
				<div className="layout">
					<div className={style.rocketWrap}>
						<div className={style.content}>
							<motion.div
								initial={{ y: 100, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.2,
										duration: 0.5,
									},
								}}
							>
								<h1 className={style.heading}>{data.home_banner_heading}</h1>
							</motion.div>
							<motion.div
								initial={{ y: 100, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
							>
								<p className={style.paragraph}>
									{data.home_banner_description}
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.5,
										duration: 0.6,
									},
								}}
							>
								<div className={style?.btnBox}></div>
								<BtnLink
									path="/advertise"
									text="Get Started"
									icon={ICON.arrowIcon}
								/>
							</motion.div>
						</div>
						{/* <motion.div
							initial={{ opacity: 0, y: 10 }} 
							animate={{ opacity: 1, y: 0 }}  
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<Image
								alt="rocket-icon"
								className={style.rocket}
								src={ICON.rocket}
							/>
						</motion.div> */}
						<Image
							alt="rocket-icon"
							className={style.rocket}
							src={ICON.rocket}
						/>
					</div>
				</div>
				<Image
					alt="banner-vector-1"
					className={style.bannerV1}
					src={ICON.bannerV1}
				/>
				<Image
					alt="banner-vector-2"
					className={style.bannerV2}
					src={ICON.bannerV2}
				/>
			</section>
		</motion.div>
	);
}

export default Banner;
