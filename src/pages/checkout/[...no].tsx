import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import style from './style.module.css';
import SummeryRow from '@/components/essential/Forms/multipart-form/checkout/SummeryRow';
import amrPay from '../../../public/images/amar-pay-icon.svg';
import myBalance from '../../../public/images/my-balance.svg';
import {
	initialState,
	reducer,
} from '../../components/reducer-actions/checkout-action';
import axios from 'axios';
import { USER } from '@/all-api/auth-headers';
import Loader from '@/components/ui/Loader/Loader';
import { alertError, alertSuccess, popUpAlert } from '@/components/ui/alert';
import Head from 'next/head';
import { BASE_URL, DASHBOARD_URL } from '@/lib/env';
import { GridLoader } from '@/components/ui/Loader';

const Checkout = () => {
	const user = USER();
	const router = useRouter();
	const [subAmount, setSubAmount] = useState(0);
	const [discount, setDiscount] = useState();
	const [amount, setAmount] = useState(subAmount);
	const [success, setSuccess] = useState('');
	const [loader, setLoader] = useState(false);
	const [loading, setLoading] = useState(false);
	const [couponLoading, setCouponLoading] = useState(false);
	const [singleData, setSingleData] = useState<any>({});

	const [resCouponData, setResCouponData] = useState<any>(null);
	const id = router.query.no?.[0];
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoader(true);
				const response = await axios.get(
					`${BASE_URL}/api/buy/subscription/${id}`,
					{
						headers: {
							Authorization: user?.token,
							withCredentials: true,
						},
					}
				);
				const data = await response.data;
				if (data?.data === 'success') {
					dispatch({ type: 'API_DATA_SUB_ID', payload: data?.message });
					setSubAmount(data?.message?.subscription_amount);
					setAmount(data?.message?.subscription_amount);
					setSingleData(data?.message);
				}
				setLoader(false);
			} catch (error) {}
		};
		fetchData();
	}, [id, user.token]);

	const handleCouponSubmit = async (e: any) => {
		e.preventDefault();
		setCouponLoading(true);
		setResCouponData(null);
		setSuccess('');
		dispatch({ type: 'API_DATA_COUPON_ID', payload: { id: null } });

		const name = e.target.name.value;
		const res = await axios.post(
			`${BASE_URL}/api/apply/coupon`,
			{ name },
			{
				headers: {
					Authorization: user?.token,
					withCredentials: true,
				},
			}
		);
		const data = await res.data;

		if (data?.data === 'success') {
			dispatch({ type: 'API_DATA_COUPON_ID', payload: data?.message });
			setResCouponData(data?.message);

			if (data?.message.type === 'flat') {
				const oldAmount: any = subAmount;
				const discountAount = data?.message?.amount;
				setDiscount(discountAount);
				setAmount(oldAmount - discountAount);
				setSuccess('You get a discount.');
			} else if (data?.message === 'percentage') {
				const oldAmountsPercentage: any = subAmount;
				const oldAmountPercentage =
					(oldAmountsPercentage * data?.message?.amount) / 100;
				const discountAountPercentage = data?.message?.amount;
				setDiscount(discountAountPercentage);
				setAmount(oldAmountPercentage - discountAountPercentage);
			}
		} else if (data?.success === false) {
			setSuccess("Your Coupon in invalid! So, You don't get any discount.");
			setAmount(subAmount);
		}
		setCouponLoading(false);
	};

	const submitPay = async () => {
		const cb = async () => {
			setLoading(true);
			const getData = { ...state };
			const submitData = {
				coupon_id: getData?.coupon_id,
				subscription_id: getData?.subscription_id,
				payment_type: getData?.payment_type,
			};
			const res = await axios.post(
				`${BASE_URL}/api/buy-subscription`,
				submitData,
				{
					headers: {
						Authorization: user?.token,
						withCredentials: true,
					},
				}
			);
			const data = await res.data;
			if (data?.result === 'true') {
				window.location.href = data?.payment_url;
			} else if (data?.data === 'fail') {
				alertError('Error', data?.message);
			} else if (data?.data === 'success') {
				alertSuccess('Success', data?.message);
				window.location.href = DASHBOARD_URL as string;
				// router.push('/');
			}
			setLoading(false);
		};
		popUpAlert('Checkout ', 'Are You Sure?', 'warning', cb);
	};

	function convertNegativeToZero(number: any) {
		if (number < 0) {
			return 0;
		} else {
			return number;
		}
	}

	return (
		<>
			<Head>
				<title>Checkout - SOS</title>
				<meta
					property="og:title"
					content="Checkout - SOS"
					key="Checkout - SOS"
				/>
			</Head>
			<div className={`${style.checkoutFinal} ${style.active}`}>
				<h1 className={style.heading}>Final Checkout</h1>
				<p className={style.subHeading}>
					The mobile banking service of Mercantile Bank Ltd is branded as and it
					aims to connect
				</p>
				{loader ? (
					<div className="max-w-7xl mx-auto">
						<GridLoader />
					</div>
				) : (
					<div className={style.orderBox}>
						<h1 className={style.boxHeading}>Order Summary</h1>
						<div className={style.summeryBox}>
							<SummeryRow
								pp={`৳${subAmount}`}
								text={{ h: 'Total Budget', p: 'BDT Currency' }}
							/>
							{/* {discount && (
								<SummeryRow pp={`৳${discount}`} text={{ h: 'Discount' }} />
							)} */}
							{resCouponData && (
								<>
									<SummeryRow
										pp={`${resCouponData?.type === 'flat' ? '৳' : ''} ${
											resCouponData?.amount
										}  ${resCouponData?.type === 'flat' ? '' : '%'}`}
										text={{ h: `Discount`, p: 'BDT Currency' }}
									/>
								</>
							)}
							<SummeryRow
								pp={`৳${
									resCouponData
										? resCouponData.type === 'flat'
											? convertNegativeToZero(
													singleData?.subscription_amount -
														parseInt(resCouponData.amount)
											  )
											: convertNegativeToZero(
													singleData?.subscription_amount -
														(singleData?.subscription_amount *
															parseInt(resCouponData.amount)) /
															100
											  )
										: singleData?.subscription_amount
								}`}
								text={{ h: `You've to pay`, p: 'BDT Conversion Rate' }}
							/>{' '}
							{success && (
								<span
									style={{
										color: 'green',
										fontSize: '18px',
									}}
								>
									{success}
								</span>
							)}
							<form
								onSubmit={handleCouponSubmit}
								className={style.couponSubmit}
							>
								<div style={{ width: '100%' }}>
									<label htmlFor="">Coupon Name</label>
									<input
										type="text"
										name="name"
										id=""
										placeholder="Coupon Name"
										className={`${style.inputFiled} `}
									/>
								</div>
								<button
									type="submit"
									className={`${style.submitBtn} w-full flex justify-center`}
								>
									{couponLoading ? <Loader /> : 'Apply Coupon'}
								</button>
								{/* <input
									type="submit"
									value="Apply Coupon"
									className={style.submitBtn}
								/> */}
							</form>
						</div>
						{/* choose box  */}
						<div className={style.chooseWallerBox}>
							<h1 className={style.chooseWalletHeading}>Choose Your Wallet</h1>
							<div className={style.payOptions}>
								<div
									onClick={() =>
										dispatch({
											payload: 'aamarpay',
											type: 'SELECT_PAYMENT_METHOD',
										})
									}
									className={`${style.checkField} ${
										state.payment_type === 'aamarpay' && style.active
									}`}
								>
									<span className={style.checkBorder}>
										<span
											className={`${style.dot} ${
												state.payment_type === 'aamarpay' && style.active
											}`}
										></span>
									</span>
									<Image alt="amr-pay" src={amrPay} />
								</div>

								<div
									onClick={() =>
										dispatch({
											payload: 'my-wallet',
											type: 'SELECT_PAYMENT_METHOD',
										})
									}
									className={`${style.checkField} ${
										state.payment_type === 'my-wallet' && style.active
									}`}
								>
									<span className={style.checkBorder}>
										<span
											className={`${style.dot} ${
												state.payment_type === 'my-wallet' && style.active
											}`}
										></span>
									</span>
									<Image alt="amr-pay" src={myBalance} />
								</div>
							</div>
						</div>

						<button onClick={submitPay} type="button" className={style.btn}>
							{loading ? <Loader /> : 'Procced To Pay'}
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Checkout;
