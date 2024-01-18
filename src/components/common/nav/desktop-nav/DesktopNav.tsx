import { IMenu } from '@/types/Ui-Types';
import style from './style.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function DesktopNav({ data }: { data: IMenu[] }) {
	const router = useRouter();

	return (
		<div className={style.navWrap}>
			{data.map((e) => (
				<Link
					className={`${style.navItem} ${
						(router.pathname === e.path ||
							e.subRoute.includes(router.pathname)) &&
						style.active
					}`}
					href={e.path}
					key={e.id}
				>
					{e.menu}
				</Link>
			))}
		</div>
	);
}

export default DesktopNav;
