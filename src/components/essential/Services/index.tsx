import Heading from '@/components/ui/Heading';
import style from './services.module.css';
import Image from 'next/image';
import { ICON } from '@/lib/img';
import { IconPickerItem } from 'react-fa-icon-picker';
import { motion } from 'framer-motion';

function Services({ settingsData, getServiceData }: any) {
	const data = settingsData.message;
	const serviceData = getServiceData?.message;

	return (
		<div className={style.servicesWrap}>
			<div className="layout">
				<div className={style.services}>
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
						<div>
							<Heading
								h1={data.service_one_title}
								p={data.service_one_heading}
							/>
						</div>
					</motion.div>

					<div className={style.cardWrap}>
						{serviceData?.map((singleData: any, i: any) => (
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: i === 1 ? 0.3 : i === 0 ? 0.4 : 0.4,
									},
								}}
								className={style.card}
								key={i}
							>
								<div className={style.icon}>
									<div className={style.serviceCardImg}>
										<Image
											className={style.icon}
											alt="icon"
											src={ICON.yellow}
										/>
										<div className={style.serviceOneIcon}>
											<IconPickerItem
												size={40}
												icon={singleData?.icon}
												color="#fff"
											/>
										</div>
									</div>
								</div>
								<h1 className={style.heading}>{singleData.title}</h1>
								<p className={style.subheading}>{singleData.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Services;
