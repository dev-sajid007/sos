import style from './nav-style.module.css';
import DesktopNav from './desktop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import Image from 'next/image';
import { ICON } from '@/lib/img';
import { menuData } from '@/lib/data/NavMenu';
import BtnLink from '@/components/ui/BtnLink';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { logout } from '@/all-api/api-hook';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {
	BASE_URL,
	DASHBOARD_PAGE,
	DASHBOARD_URL,
	PROFILE_PAGE,
} from '@/lib/env';
import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
import logo from '../../../../public/images/logo.png';
import axios from 'axios';
import { USER } from '@/all-api/auth-headers';
import ProfileLoader from '@/components/ui/Loader/ProfileLoader';
import Head from 'next/head';
import Script from 'next/script';
// className={style}

function Nav() {
	const [open, setOpen] = useState(false);
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const [nav, setNav] = useState<any>({});
	const imgUrl = BASE_URL;
	const { token } = USER();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState<any>(null);
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
		const fetchData = async () => {
			const response = await fetch(`${BASE_URL}/api/settings`);
			const data = await response.json();
			setNav(data?.message);
		};
		fetchData();
	}, []);
	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				try {
					setLoading(true);
					const response = await axios.get(`${BASE_URL}/api/profile-data`, {
						headers: {
							Authorization: session?.user.token
								? `Bearer ${session.user.token}`
								: null,
							withCredentials: true,
						},
					});
					const res = response?.data;
					if (res?.message === 'Unauthenticated.') {
						return logout();
					}
					if (res?.status === 200) {
						setProfile(res?.user);
					}
					setLoading(false);
				} catch (error: any) {
					if (error.message === 'Request failed with status code 401') {
						return logout();
					}
					setLoading(false);
				}
			}
		};

		fetchData();
	}, [session]);

	return (
		<>
			{nav?.tag_manager && (
				<Script id="google-tag-manager" strategy="afterInteractive">
					{nav.tag_manager}
				</Script>
			)}

			<nav className={style.nav}>
				{isLoading && (
					<div className={style['progress-bar']}>
						<div className={style['progress-fill']}></div>
						<div className={style['progress-fill2']}></div>
					</div>
				)}
				<div className={style.navWrap}>
					<Link href="/">
						<Image
							className={style.logo}
							alt="logo"
							width={202}
							height={60}
							src={nav?.logo ? `${imgUrl}/${nav?.logo}` : logo}
						/>
					</Link>
					<DesktopNav data={menuData} />

					<div className={style.buttonBox}>
						{session?.user.username ? (
							<div className="flex items-center gap-2">
								<div className="dropdown dropdown-end">
									<div tabIndex={0} className="avatar online placeholder">
										<div className="bg-[#004da3] text-white rounded-full w-16">
											<span className="text-xl capitalize">
												{loading
													? 'load..'
													: profile?.name?.slice(0, 2) || '--'}
											</span>
										</div>
									</div>
									{!loading && (
										<ul
											tabIndex={0}
											className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-3"
										>
											<li className="cursor-default">
												<button
													onClick={() =>
														PROFILE_PAGE(
															session.user.role,
															profile?.usersubscription,
															router
														)
													}
													type="button"
													// href={PROFILE_PAGE(
													// 	session.user.role,
													// 	profile?.usersubscription
													// )}
													className="capitalize"
												>
													{session.user.username}
												</button>
											</li>
											<li>
												<button
													type="button"
													onClick={() =>
														DASHBOARD_PAGE(
															session.user.role,
															profile?.usersubscription,
															router
														)
													}
													className="capitalize"
												>
													Dashboard
												</button>
											</li>
											<li>
												<button
													onClick={() => logout()}
													className={`${style.btn} !py-2 !w-full`}
												>
													<span className={style.text}>Log out</span>
												</button>
											</li>
										</ul>
									)}
								</div>
							</div>
						) : (
							<>
								<Link href={'/login'} className={style.login}>
									Login
								</Link>
								<BtnLink text="Register" path="/register" />
							</>
						)}
					</div>

					<div onClick={() => setOpen(!open)} className={style.mobileToggler}>
						{open ? (
							<FaTimes className={style.iconMenu} />
						) : (
							<ICON.menu className={style.iconMenu}></ICON.menu>
						)}
					</div>
				</div>

				<MobileNav data={menuData} open={open} setOpen={setOpen} />

				{/* <div
				className={`absolute duration-500 ease-in z-50 top-0 h-full ${
					open ? 'right-0 block' : 'right-[-600px] hidden'
				}`}
			>
				<MobileNav data={menuData} open={open} />
			</div> */}
			</nav>
		</>
	);
}

export default Nav;
