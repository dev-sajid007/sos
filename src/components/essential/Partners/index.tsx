import Heading from '@/components/ui/Heading';
import style from './partners.module.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { DashLoader } from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { BASE_URL } from '@/lib/env';

// import "./styles.css";

function Partners({ settingsData }: any) {
	const [getPartner, setGetPartner] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const res = await fetchData('/api/partners');
			setGetPartner(res);
			setLoading(false);
		};
		getData();
	}, []);
	const data = settingsData?.message;
	const dummyData = getPartner?.message;
	const imgUrl = BASE_URL;
	return (
		<section className="layout">
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
					h1={data.partner_title}
					p={data.partner_heading}
					center="center"
				/>
			</motion.div>

			{loading ? (
				<DashLoader />
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.7,
							delay: 0.5,
						},
					}}
				>
					<Swiper
						spaceBetween={24}
						centeredSlides={false}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						breakpoints={{
							1500: {
								slidesPerView: 6,
								spaceBetween: 24,
							},
							1100: {
								slidesPerView: 5,
								spaceBetween: 24,
							},
							1024: {
								slidesPerView: 4,
								spaceBetween: 24,
							},
							776: {
								slidesPerView: 3,
								spaceBetween: 24,
							},
							414: {
								slidesPerView: 2,
								spaceBetween: 24,
							},
						}}
						modules={[Autoplay, Pagination, Navigation]}
						className={style.mySwiper}
					>
						{dummyData?.map((e: any) => (
							<SwiperSlide
								key={e.id}
								style={{
									paddingBottom: '20px',
									paddingTop: '20px',
									marginTop: '40px',
									marginBottom: '30px',
								}}
							>
								<div className={style.imgBox}>
									<Image
										alt=""
										className={style.img}
										src={`${imgUrl}/${e.image}`}
										width={133}
										height={40}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			)}
		</section>
	);
}

export default Partners;
