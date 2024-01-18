import Image from 'next/image';
import style from './style.module.css';
import { ICON } from '@/lib/img';
import Link from 'next/link';
import FooterTop from './footer-top';
import FooterCenter from './footer-center';
import PayWith from './footer-pay-with';
import FooterCopyRight from './footer-copy-right';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/lib/env';

function Footer() {
	const [settingsData, setSettingsData] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(BASE_URL + '/api/settings');
			const data = await response.json();
			setSettingsData(data);
		};
		fetchData();
	}, []);
	return (
		<footer className={style.footer}>
			<div className={`${style.footerWrap} layout`}>
				{/* join news latter  */}
				<FooterTop settingsData={settingsData} />

				<hr className={style.hr} />

				{/* links  */}
				<FooterCenter settingsData={settingsData} />

				{/* pay icon  */}
				<PayWith />

				<hr className={style.hr} />

				{/* copy right  */}
				<FooterCopyRight settingsData={settingsData} />
			</div>
		</footer>
	);
}

export default Footer;
