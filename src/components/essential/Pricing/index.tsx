import Radio from '@/components/ui/Input/Radio';
import style from './pricing.module.css';
import PricingCard from '@/components/ui/Cards/PricingCard';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchData } from '@/components/actions/action';
import { motion } from 'framer-motion';
import { GridLoader } from '@/components/ui/Loader';
function Pricing({ user }: { user?: any }) {
	const [subscriptions, setSubscription] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const res = await fetchData('/api/subscriptions');
			setSubscription(res);
			setLoading(false);
		};
		getData();
	}, []);
	const { data: session } = useSession();
	const role = session?.user.role;
	const [toggle, setToggle] = useState(role === '3' ? 'affiliate' : 'vendor');
	const [time, setTime] = useState('monthly');

	return (
		<section className={`${style.pricingMain} !mt-0`}>
			<div className="layout">
				<div className={style.wrap}>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className={style.topOfHead}
					>
						<button
							disabled={role === '3'}
							onClick={() => setToggle('vendor')}
							className={`${style.btnTop} ${
								toggle === 'vendor' && style.active
							}`}
						>
							Vendor
						</button>
						<button
							disabled={role === '2'}
							onClick={() => setToggle('affiliate')}
							className={`${style.btnTop} ${
								toggle === 'affiliate' && style.active
							}`}
						>
							Affiliate
						</button>
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
						className={style.DateSelectBox}
					>
						<div className={style.date}>
							<Radio time={time} setTime={setTime} txt={'monthly'} />
							<Radio time={time} setTime={setTime} txt={'half_yearly'} />
							<Radio time={time} setTime={setTime} txt={'yearly'} />
						</div>
					</motion.div>
					{loading ? (
						<GridLoader />
					) : (
						<div className={style.ppCards}>
							{subscriptions?.data
								?.filter((e: any) => e.subscription_user_type === toggle)
								?.filter((e: any) => e.subscription_package_type === time)
								?.map((item: any, i: number) => (
									<PricingCard
										loading={loading}
										key={item.id}
										data={item}
										time={time}
										user={user}
										i={i}
									/>
								))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default Pricing;
