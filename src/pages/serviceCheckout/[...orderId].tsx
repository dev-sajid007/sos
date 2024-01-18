import SummeryRow from '@/components/essential/Forms/multipart-form/checkout/SummeryRow';
import React, { useEffect, useReducer, useState } from 'react';
import style from './style.module.css';
import {
	initialState,
	reducer,
} from '../../components/reducer-actions/serviceOrder-action';
import Image from 'next/image';
import amrPay from '../../../public/images/amar-pay-icon.svg';
import myBalance from '../../../public/images/my-balance.svg';
import Loader from '@/components/ui/Loader/Loader';
import { useRouter } from 'next/router';
import axios from 'axios';
import { USER } from '@/all-api/auth-headers';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { BASE_URL, DASHBOARD_PAGE, DASHBOARD_URL } from '@/lib/env';
import { popUpAlert } from '@/components/ui/alert';

const ServiceOrder = () => {
	const user = USER();
	const router = useRouter();
	const amount = router?.query?.orderId?.[2];
	const [loading, setIsLoading] = useState(false);
	const [resError, setResError] = useState('');

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: 'API_DATA', payload: router });
	}, [router]);

	const submitOrder = async (e: any) => {
		e.preventDefault();
		setResError('');
		const cb = async () => {
			if (!user.token) {
				return router.push('/login');
			}
			setIsLoading(true);
			const datas = { ...state?.data };
			const submitData = {
				payment_type: datas?.payment_type,
				service_package_id: datas?.service_package_id,
				vendor_service_id: datas?.vendor_service_id,
				details: datas?.details,
				files: datas?.files,
			};
			const res = await axios.post(
				BASE_URL + '/api/service/order',
				{
					...submitData,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.token,
						withCredentials: true,
					},
				}
			);
			const data = await res.data;
			console.log(data);
			if (data?.result === 'true') {
				window.location.href = data?.payment_url;
			} else if (data?.success === false) {
				toast.success(data?.data?.payment_type[0]);
				if (data?.message === 'Validation errors') {
					setResError(data?.data?.payment_type[0]);
				}
			} else if (data === 'Success') {
				toast.success(data);
				window.location.href =
					DASHBOARD_PAGE(user?.role as string, router, true) +
					'/my-service-order';
			}
			setIsLoading(false);
		};
		popUpAlert('Checkout', 'Are You Sure?', 'question', cb);
	};

	return (
		<>
			<Head>
				<title>Checkout - SOS</title>
				<meta property="og:title" content="SOS-Checkout" key="SOS-Checkout" />
			</Head>
			<div className={`${style.checkoutFinal} ${style.active}`}>
				<h1 className={style.heading}>Final Checkout</h1>
				<p className={style.subHeading}>
					The mobile banking service of Mercantile Bank Ltd is branded as and it
					aims to connect
				</p>
				<form onSubmit={submitOrder} className={style.orderBox}>
					<h1 className={style.boxHeading}>Order Summary</h1>
					<div className={style.summeryBox}>
						<SummeryRow
							pp={`${amount} TK.`}
							text={{ h: 'Total Budget', p: 'BDT Currency' }}
						/>
						<SummeryRow
							pp={`${amount} TK.`}
							text={{ h: `You've to pay`, p: 'BDT Conversion Rate %' }}
						/>
					</div>
					<div className={style.chooseWallerBox}>
						<div>
							<label className={style.label}>Message</label>
							<textarea
								name="details"
								id=""
								placeholder="Your Message"
								className={style.orderMessage}
								onBlur={(e) =>
									dispatch({
										type: 'INPUT',
										payload: { name: e.target.name, value: e.target.value },
									})
								}
							/>
						</div>
						<div>
							<div className={style.advertiser_store_image_preview}>
								<label className={style.label}>
									You can choose mulitple files
								</label>
								<div className={style.customFile}>
									<input
										type="file"
										multiple
										onChange={(e) =>
											dispatch({
												type: 'MULTI_FILE',
												payload: {
													name: e.target.name,
													value: e.target.files,
													url: 'files_url',
												},
											})
										}
										name="files"
										className={style.customFileInput}
										accept=".jpg, .jpeg, .png"
									/>
									<label className={style.customFileLabel} htmlFor="coverImage">
										Choose file...
									</label>
								</div>
								{(state.data.files[0] as { name: string })?.name.endsWith(
									'.png'
								) ||
								(state.data.files[0] as { name: string })?.name.endsWith(
									'.jpg'
								) ||
								(state.data.files[0] as { name: string })?.name.endsWith(
									'.jpeg'
								) ? (
									<div className={style.preImagView}>
										{state?.data?.files_url?.map((e, i) => (
											<Image
												key={i}
												height={50}
												width={50}
												style={{
													height: '50px',
													width: '50px',
													borderRadius: '5px',
												}}
												src={e}
												alt="asdad"
											/>
										))}
									</div>
								) : (
									<div className={style.preImagView}>
										{state?.data?.files_url?.map((i) => (
											<svg
												key={i}
												xmlns="http://www.w3.org/2000/svg"
												width="50"
												height="50"
												viewBox="0 0 1536 1792"
											>
												<path
													fill="currentColor"
													d="M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640H992q-40 0-68-28t-28-68V128H128v1536h1280zm-514-593q33 26 84 56q59-7 117-7q147 0 177 49q16 22 2 52q0 1-1 2l-2 2v1q-6 38-71 38q-48 0-115-20t-130-53q-221 24-392 83q-153 262-242 262q-15 0-28-7l-24-12q-1-1-6-5q-10-10-6-36q9-40 56-91.5t132-96.5q14-9 23 6q2 2 2 4q52-85 107-197q68-136 104-262q-24-82-30.5-159.5T657 552q11-40 42-40h22q23 0 35 15q18 21 9 68q-2 6-4 8q1 3 1 8v30q-2 123-14 192q55 164 146 238zm-576 411q52-24 137-158q-51 40-87.5 84t-49.5 74zm398-920q-15 42-2 132q1-7 7-44q0-3 7-43q1-4 4-8q-1-1-1-2q-1-2-1-3q-1-22-13-36q0 1-1 2v2zm-124 661q135-54 284-81q-2-1-13-9.5t-16-13.5q-76-67-127-176q-27 86-83 197q-30 56-45 83zm646-16q-24-24-140-24q76 28 124 28q14 0 18-1q0-1-2-3z"
												/>
											</svg>
										))}
									</div>
								)}
							</div>
						</div>
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
									state?.data?.payment_type === 'aamarpay' && style.active
								}`}
							>
								<span className={style.checkBorder}>
									<span
										className={`${style.dot} ${
											state?.data?.payment_type === 'aamarpay' && style.active
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
									state?.data?.payment_type === 'my-wallet' && style.active
								}`}
							>
								<span className={style.checkBorder}>
									<span
										className={`${style.dot} ${
											state?.data?.payment_type === 'my-wallet' && style.active
										}`}
									></span>
								</span>
								<Image alt="amr-pay" src={myBalance} />
							</div>
						</div>
					</div>
					{resError && (
						<div className="alert alert-error">
							<svg
								onClick={() =>
									dispatch({
										type: 'CLEAR_VALIDATION_ERROR',
										payload: null,
									})
								}
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Error! {resError}</span>
						</div>
					)}
					<button
						disabled={
							loading || Object.values(state?.required).some((error) => error)
						}
						type="submit"
						id={style.btn}
					>
						{loading ? <Loader /> : 'Procced To Pay'}
					</button>
				</form>
			</div>
		</>
	);
};

export default ServiceOrder;
