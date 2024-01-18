import { FormEvent, useEffect, useReducer } from 'react';
import {
	initialState,
	reducer,
} from '../../components/reducer-actions/login-action';
import style from './sign-in.module.css';
import { useState } from 'react';
import Logo from 'public/images/LoginLogo.png';
import Input from '@/components/common/form-element/Input/Input';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { alertError, tostSuccess } from '@/components/ui/alert';
import { setCookie } from '@/hooks';
import { logout } from '@/all-api/api-hook';
import { useRouter } from 'next/router';
import { DASHBOARD_URL } from '@/lib/env';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { SimpleLoader } from '@/components/ui/Loader';
import Loader from '@/components/ui/Loader/Loader';

function Login() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { data: session } = useSession();
	const [load, setLoading] = useState(false);
	const router = useRouter();
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
		// If the user is already authenticated, redirect them away from the login page.
		if (session) {
			setCookie('userInfo', JSON.stringify(session?.user), 30); // Expires in 30 days

			window.location.href = DASHBOARD_URL as string;
		}
	}, [session, router]);
	const login_form_handler = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const target = e.target as HTMLFormElement;
		try {
			await logout();

			// setLoading(true);
			const result = await signIn('credentials', {
				email: state.data.email,
				password: state.data.password,
				from: 'login',
				redirect: false,
				callbackUrl: '/',
			});

			if (result?.status === 401) {
				alertError('Error', result?.error || '');
			} else if (result?.status === 200) {
				// router.push('/');

				tostSuccess('Login Success!');
			}
		} catch (error) {}

		setLoading(false);
		target.reset();
	};

	if (isLoading) {
		return (
			<section className={style.loginBg}>
				<div className="layout ">
					<div className={style.layoutBgImg}>
						<div className={style.loginFormBox}>
							<div className="h-[50vh] flex justify-center items-center relative">
								<SimpleLoader />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<Head>
				<title>Login - SOS</title>
				<meta property="og:title" content="Login - SOS" key="Login - SOS" />
			</Head>
			<section className={style.loginBg}>
				<div className="layout ">
					<div className={style.layoutBgImg}>
						<div className={style.loginFormBox}>
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
								className={style.LoginImg}
							>
								<Image
									className={style.singleChooseImg}
									src={Logo}
									alt="Choose Us Images"
								/>
							</motion.div>
							{session?.user ? (
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
								>
									<div className={style.loginFromHeading}>
										<h3>Login Success</h3>
										<p className="text-xl mt-2">
											Welcome{' '}
											<span className="text-blue-600 capitalize">
												{session.user.username}
											</span>
										</p>
										<Link
											className="text-lg bg-sky-500 text-white px-4 py-1 rounded-lg"
											href={DASHBOARD_URL as string}
										>
											Go to Dashboard
										</Link>
									</div>
								</motion.div>
							) : (
								<>
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
										className={style.loginFromHeading}
									>
										<h3>Login Your Account</h3>
									</motion.div>
									<form onSubmit={login_form_handler}>
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
												label="Email"
												name="email"
												state={state}
												placeholder="Your Email"
												type="email"
												tabIndex={0}
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
										>
											<Input
												dispatch={dispatch}
												label="Password"
												name="password"
												state={state}
												placeholder="Your Password"
												type="password"
												tabIndex={1}
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
											className={style.loginButton}
										>
											<button
												disabled={
													load || Object.values(state.error).some((e) => e)
												}
												type="submit"
												className={`${style.loginBtn} flex justify-center items-center`}
											>
												{load ? <Loader /> : <span>Login</span>}
											</button>
										</motion.div>
										<div className={style.goRegister}>
											<p>
												New here?
												<Link className={style.loginGoRLink} href="/register ">
													Register now
												</Link>
											</p>
										</div>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Login;
