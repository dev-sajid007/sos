import Heading from '@/components/ui/Heading';
import style from './choose-us.module.css';
import ChooseUsCard from '@/components/ui/Cards/ChooseUsCard';
import { motion } from 'framer-motion';

function ChooseUs({ settingsData }: any) {
	const data = settingsData.message;

	return (
		<section className={style.chooseUs}>
			<div className="layout">
				<div className={style.chooseWrap}>
					<div className={style.choseUs__left}>
						<div>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 1,
										delay: 0.5,
									},
								}}
							>
								<Heading
									h1={data.chose_us_title}
									p={data.chose_us_heading}
									center="left"
								/>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 1,
									delay: 0.6,
								},
							}}
						>
							<p className={style.chooseSubTxt}>{data.chose_description}</p>
						</motion.div>
						<div key={data.id} className={style.progressSection}>
							<div className={style.progressbarWrap}>
								<p className={style.progressbar}>{data.progress_title}</p>
								<p className={style.progressbarValue}>{data.progress_value}%</p>
							</div>
							<div className="flex w-full h-3 bg-[#E3E3E3] rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									whileInView={{
										width: `${data.progress_value}%`,
										transition: {
											duration: 1,
											delay: 0.6,
										},
									}}
									className="flex flex-col justify-center overflow-hidden bg-gradient-to-r from-[#206bce] to-[#1A77F2]"
									role="progressbar"
									style={{ width: `${data.progress_value}%` }}
									aria-valuenow={data.progress_value}
									aria-valuemin={0}
									aria-valuemax={100}
								></motion.div>
							</div>
						</div>
						<div key={data.id} className={style.progressSection}>
							<div className={style.progressbarWrap}>
								<p className={style.progressbar}>{data.progres_two_title}</p>
								<p className={style.progressbarValue}>
									{data.progres_two_value}%
								</p>
							</div>
							<div className="flex w-full h-3 bg-[#E3E3E3] rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									whileInView={{
										width: `${data.progres_two_value}%`,
										transition: {
											duration: 1,
											delay: 0.6,
										},
									}}
									className="flex flex-col justify-center overflow-hidden bg-gradient-to-r from-[#206bce] to-[#1A77F2]"
									role="progressbar"
									style={{ width: `${data.progres_two_value}%` }}
									aria-valuenow={data.progres_two_value}
									aria-valuemin={0}
									aria-valuemax={100}
								></motion.div>
							</div>
						</div>
						<div key={data.id} className={style.progressSection}>
							<div className={style.progressbarWrap}>
								<p className={style.progressbar}>{data.progres_three_title}</p>
								<p className={style.progressbarValue}>
									{data.progres_three_value}%
								</p>
							</div>
							<div className="flex w-full h-3 bg-[#E3E3E3] rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									whileInView={{
										width: `${data.progres_three_value}%`,
										transition: {
											duration: 1,
											delay: 0.6,
										},
									}}
									className="flex flex-col justify-center overflow-hidden bg-gradient-to-r from-[#206bce] to-[#1A77F2]"
									role="progressbar"
									style={{ width: `${data.progres_three_value}%` }}
									aria-valuenow={data.progres_three_value}
									aria-valuemin={0}
									aria-valuemax={100}
								></motion.div>
							</div>
						</div>
						<div key={data.id} className={style.progressSection}>
							<div className={style.progressbarWrap}>
								<p className={style.progressbar}>{data.progres_four_title}</p>
								<p className={style.progressbarValue}>
									{data.progres_four_value}%
								</p>
							</div>
							<div className="flex w-full h-3 bg-[#E3E3E3] rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									whileInView={{
										width: `${data.progres_four_value}%`,
										transition: {
											duration: 1,
											delay: 0.6,
										},
									}}
									className="flex flex-col justify-center overflow-hidden bg-gradient-to-r from-[#206bce] to-[#1A77F2]"
									role="progressbar"
									style={{ width: `${data.progres_four_value}%` }}
									aria-valuenow={data.progres_four_value}
									aria-valuemin={0}
									aria-valuemax={100}
								></motion.div>
							</div>
						</div>
					</div>
					<div className={style.choseUs__right}>
						<div className={style.cards}>
							<div className={style.cards_group}>
								{/* card 1  */}
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.2,
										},
									}}
								>
									<ChooseUsCard
										icon={data?.chose_card_one_icon}
										title={data?.chose_card_one_title}
										subtitle={data?.chose_card_one_description}
									/>
								</motion.div>

								{/* card 2  */}
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.3,
										},
									}}
								>
									<ChooseUsCard
										icon={data?.chose_card_two_icon}
										title={data?.chose_card_two_title}
										subtitle={data?.chose_card_two_description}
									/>
								</motion.div>
							</div>
							<div className={style.cards_group2}>
								{/* card 3  */}

								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.4,
										},
									}}
								>
									<ChooseUsCard
										icon={data?.chose_card_three_icon}
										title={data?.chose_card_three_title}
										subtitle={data?.chose_card_three_description}
									/>
								</motion.div>

								{/* card 4  */}

								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.5,
										},
									}}
								>
									<ChooseUsCard
										icon={data?.chose_card_four_icon}
										title={data?.chose_card_four_title}
										subtitle={data?.chose_card_four_description}
									/>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ChooseUs;
