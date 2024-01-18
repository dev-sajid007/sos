import Style from '../../components/ui/Button/role-btn/Register.style.module.css';
import { FormEvent, useEffect, useReducer } from 'react';
import {
	initialState,
	reducer,
} from '../../components/reducer-actions/register-action';
import { useState } from 'react';
import Logo from '../../../public/images/LoginLogo.png';
import Input from '../../components/common/form-element/Input/Input';
import Link from 'next/link';
import Image from 'next/image';
import { alertError, alertSuccess, tostSuccess } from '@/components/ui/alert';
import { signIn, signOut, useSession } from 'next-auth/react';
import RoleButton from '@/components/ui/Button/role-btn/RoleButton';
import { setCookie } from '@/hooks';
import Pricing from '@/components/essential/Pricing';
import { useProfileQuery } from '@/store/feature/api/webDataAPI';
import { userPath } from '@/components/actions/action';
import { JoinNowCard } from '@/components/ui/Cards/Join-now';
import { DASHBOARD_URL } from '@/lib/env';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { SimpleLoader } from '@/components/ui/Loader';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader/Loader';

function Register() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { data: session } = useSession();
	const { data } = useProfileQuery(userPath(session?.user.role as string));
	const router = useRouter();

	const [load, setLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true);
		};

		const handleRouteChangeComplete = () => {
			setIsLoading(false);
		};

		const handleRouteChangeError = () => {
			setIsLoading(false);
		};

		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeComplete);
		router.events.on('routeChangeError', handleRouteChangeError);

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
			router.events.off('routeChangeError', handleRouteChangeError);
		};
	}, [router]);

	useEffect(() => {
		if (session) {
			setCookie('userInfo', JSON.stringify(session?.user), 30); // Expires in 30 days
		}
	}, [session]);

	const signUpFormHandler = async (e: FormEvent) => {
		e.preventDefault();
		setLoad(true);

		if (state.data.name === null || state.data.name === '') {
			dispatch({
				type: 'API_ERROR',
				payload: {
					name: ['Name Field is Required!'],
				},
			});
			setLoad(false);
			return;
		}
		if (state.data.email === null || state.data.email === '') {
			dispatch({
				type: 'API_ERROR',
				payload: {
					email: ['Email Field is Required!'],
				},
			});
			setLoad(false);
			return;
		}
		if (state.data.number === null || state.data.number === '') {
			dispatch({
				type: 'API_ERROR',
				payload: {
					number: ['Number Field is Required!'],
				},
			});
			setLoad(false);
			return;
		}

		if (
			state.data.password === null ||
			state.data.password === '' ||
			state.data.c_password === null ||
			state.data.c_password === '' ||
			state.data.c_password !== state.data.password
		) {
			dispatch({
				type: 'PASSWORD_MATCH',
				payload: '',
			});
			setLoad(false);
			return;
		}
		try {
			await signOut({
				redirect: false,
			});

			const result = await signIn('credentials', {
				name: state.data.name,
				role: state.data.role,
				email: state.data.email,
				number: state.data.number,
				password: state.data.password,
				from: 'register',
				redirect: false,
				callbackUrl: '/',
			});

			if (typeof result?.error === 'string') {
				const error = JSON.parse(result?.error);
				setLoad(false);
				dispatch({
					type: 'API_ERROR',
					payload: error,
				});
			} else {
				tostSuccess('Register Success!');
				if (state.data.role === '2' || state.data.role === '3') {
					router.push('/pricing');
				}
			}
		} catch (error: any) {
			alertError('Error', error.data.message);
		}
		setLoad(false);
	};

	if (session?.user.role === '4') {
		if (load || isLoading) {
			return (
				<section className={Style.loginBg}>
					<div className="layout ">
						<div className={Style.layoutBgImg}>
							<div className={Style.loginFormBox}>
								<div className="h-[50vh] flex justify-center items-center relative">
									<SimpleLoader />
								</div>
							</div>
						</div>
					</div>
				</section>
			);
		}
		return (window.location.href = DASHBOARD_URL as string);
	}
	if (session?.user.role === '2' || session?.user.role === '3') {
		return (
			<>
				<Head>
					<title>Pricing - SOS</title>
					<meta property="og:title" content="SOS-Pricing" key="SOS-Pricing" />
				</Head>
				<motion.section
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.3,
							delay: 0.15,
						},
					}}
					className={Style.loginBg}
				>
					<div className="layout ">
						<div className={Style.layoutBgImg}>
							<Pricing user={data} />;
						</div>
					</div>
				</motion.section>
			</>
		);
	}
	return (
		<>
			<Head>
				<title>Register - SOS</title>
				<meta
					property="og:title"
					content="Register - SOS"
					key="Register - SOS"
				/>
			</Head>
			<section className={Style.loginBg}>
				<div className="layout ">
					<div className={Style.layoutBgImg}>
						<div className={Style.loginFormBox}>
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										duration: 0.3,
										delay: 0.15,
									},
								}}
								className={Style.LoginImg}
							>
								<Image
									className={Style.singleChooseImg}
									src={Logo}
									alt="Choose Us Images"
								/>
							</motion.div>
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										duration: 0.4,
										delay: 0.18,
									},
								}}
								className={Style.loginFromHeading}
							>
								<h3>Create an Account Create Own Startup</h3>
							</motion.div>
							<form onSubmit={signUpFormHandler} action="">
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
								>
									<Input
										dispatch={dispatch}
										label={
											<span>
												Name{' '}
												<span
													style={{
														color: '#ff5353',
														top: '20px',
														left: '0',
														position: 'absolute',
														fontSize: '12px',
													}}
												>
													{state.resError.name && state.resError.name[0]}
													{state.error.name && 'Name Is required !'}
												</span>
											</span>
										}
										name="name"
										state={state}
										placeholder="Your Name"
									/>
								</motion.div>

								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={Style.loignTabBox}
								>
									<p className={Style.loginP}>Register as,</p>
								</motion.div>
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={Style.userItemsBox}
								>
									<RoleButton dispatch={dispatch} state={state} label="User" />
									<RoleButton
										dispatch={dispatch}
										state={state}
										label="Vendor"
									/>
									<RoleButton
										dispatch={dispatch}
										state={state}
										label="Affiliate"
									/>
								</motion.div>

								<div className={Style.registerFormFildWP}>
									<motion.div
										initial={{ y: 50, opacity: 0 }}
										whileInView={{
											y: 0,
											opacity: 1,
											transition: {
												duration: 0.3,
												delay: 0.15,
											},
										}}
										className="w-full"
									>
										<Input
											dispatch={dispatch}
											label={
												<span>
													Email{' '}
													<span
														style={{
															color: '#ff5353',
															top: '20px',
															left: '0',
															position: 'absolute',
															fontSize: '12px',
														}}
													>
														{state.resError.email && state.resError.email[0]}
														{state.error.email && 'Email Is required !'}
													</span>
												</span>
											}
											name="email"
											state={state}
											placeholder="example@gmail.com"
											type="email"
										/>
									</motion.div>
									<motion.div
										initial={{ y: 50, opacity: 0 }}
										whileInView={{
											y: 0,
											opacity: 1,
											transition: {
												duration: 0.3,
												delay: 0.15,
											},
										}}
										className="w-full"
									>
										<Input
											dispatch={dispatch}
											label={
												<span>
													Number{' '}
													<span
														style={{
															color: '#ff5353',
															top: '20px',
															left: '0',
															position: 'absolute',
															fontSize: '12px',
														}}
													>
														{state.resError.number && state.resError.number[0]}
														{state.error.number && 'Number Is required !'}
													</span>
												</span>
											}
											name="number"
											state={state}
											placeholder="Your Number"
										/>
									</motion.div>
								</div>

								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={Style.registerFormFildWP}
								>
									<Input
										dispatch={dispatch}
										label={
											<span>
												Password{' '}
												<span
													style={{
														color: '#ff5353',
														top: '20px',
														left: '0',
														position: 'absolute',
														fontSize: '12px',
													}}
												>
													{state.resError.password &&
														state.resError.password[0]}
													{!state.password_match && 'Password Not Match'}
													{state.error.password && 'Password Is required !'}
												</span>
											</span>
										}
										name="password"
										state={state}
										placeholder="******"
										type="password"
									/>
									<Input
										dispatch={dispatch}
										label={
											<span>
												Confirm Password{' '}
												<span
													style={{
														color: '#ff5353',
														top: '20px',
														left: '0',
														position: 'absolute',
														fontSize: '12px',
													}}
												>
													{!state.password_match && 'Password Not Match'}
													{state.error.c_password &&
														'Confirm Password Is required !'}
												</span>
											</span>
										}
										name="c_password"
										state={state}
										placeholder="******"
										type="password"
									/>
								</motion.div>
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={Style.checkboxWrapper}
								>
									<div className={`form-check ${Style.CheckBox}`}>
										<input
											type="checkbox"
											className="checkbox checkbox-md checkbox-info"
											style={{ border: '1px solid #3abff8' }}
											id="flexCheckDefault"
											onChange={(e) =>
												dispatch({
													type: 'INPUT',
													payload: {
														name: 'agree',
														value: e.target.checked,
													},
												})
											}
										/>
										<label
											className="form-check-label mb-0 "
											htmlFor="flexCheckDefault"
										>
											I agree to all of{' '}
											<a href="#" className="text-blue-600 underline">
												terms & conditions
											</a>
										</label>
									</div>
								</motion.div>

								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={Style.loginButton}
								>
									<button
										disabled={load || Object.values(state.error).some((e) => e)}
										type="submit"
										className={`${Style.loginBtn} flex justify-center items-center`}
									>
										{load ? <Loader /> : <span>Register Now</span>}
									</button>
								</motion.div>
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={Style.goRegister}
								>
									<p>
										Already have an account?{' '}
										<Link className={Style.loginGoRLink} href="/login">
											Log in
										</Link>
									</p>
								</motion.div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Register;

// (
// 	<motion.section
// 		initial={{ opacity: 0 }}
// 		whileInView={{
// 			opacity: 1,
// 			transition: {
// 				duration: 0.3,
// 				delay: 0.15,
// 			},
// 		}}
// 		className={Style.loginBg}
// 	>
// 		<div className="layout">
// 			<div className={Style.layoutBgImg}>
// 				<div className="pb-5">
// 					<div className={`${Style.JoinNowCardWrap} pb-10`}>
// 						<JoinNowCard
// 							bg="emerald"
// 							text="Vendor"
// 							details="The place is close to Barceloneta Beach and bus stop just 2 min by
// 			walk and near to where you can enjoy the main night life in Barcelona."
// 						/>
// 						<JoinNowCard
// 							bg="violet"
// 							text="Affiliate"
// 							details="The place is close to Barceloneta Beach and bus stop just 2 min by
// 			walk and near to where you can enjoy the main night life in Barcelona."
// 						/>
// 					</div>
// 					<div className="flex justify-center">
// 						<Link
// 							href={DASHBOARD_URL as string}
// 							className="rounded-full bg-yellow-500 px-10 pb-4 pt-3.5  text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
// 						>
// 							Go to Dashboard
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</motion.section>
// );
