import { motion } from 'framer-motion';
import style from './counter.module.css';

function Counter({ settingsData }: any) {
	const data = settingsData.message;

	// const count = useMotionValue(0);
	// const rounded = useTransform(count, (latest) => Math.round(latest));

	// const countOne = useMotionValue(0);
	// const countTwo = useMotionValue(data.count_two);

	// useEffect(() => {
	// 	const controls = animate(count, 1000);
	// 	const controlsCountOne = animate(countOne, parseInt(data.count_one));
	// 	const controlsCountTwo = animate(count, 1000);
	// 	return () => {
	// 		controls.stop();
	// 		controlsCountOne.stop();
	// 		controlsCountTwo.stop();
	// 	};
	// }, [data.count_one, data.count_two]);

	return (
		<div className={style.counter}>
			<div className={style.counterContent}>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.2,
						},
					}}
					key={data.id}
					className={style.items}
				>
					<h6 className={`${style.h1}  `}>{data.count_one}</h6>
					<p className={style.p}>{data.one_title}</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.2,
						},
					}}
					key={data.id}
					className={style.items}
				>
					<h6 className={style.h1}>{data.count_two}</h6>
					<p className={style.p}>{data.count_two_title}</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.3,
						},
					}}
					key={data.id}
					className={style.items}
				>
					<h6 className={style.h1}>{data.count_three}</h6>
					<p className={style.p}>{data.count_three_title}</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.4,
						},
					}}
					key={data.id}
					className={style.items}
				>
					<h6 className={style.h1}>{data.count_four}</h6>
					<p className={style.p}>{data.count_four_title}</p>
				</motion.div>
			</div>
		</div>
	);
}

export default Counter;
