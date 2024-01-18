import Footer from '@/components/common/footer/Footer';
import React, { ReactNode } from 'react';
import Nav from '@/components/common/nav';
import { GetServerSideProps } from 'next';
import { SessionProvider, useSession } from 'next-auth/react';
import { useAppDispatch } from '@/store/hook';
import { decrement } from '@/store/feature/counter/counterSlice';

interface LayoutOneProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutOneProps) {
	// const dispatch = useAppDispatch();

	// const { data: session } = useSession();
	return (
		<>
			{/* <SessionProvider session={}> */}
			<Nav />
			{/* <button onClick={() => dispatch(decrement())}>decrement</button> */}

			<main>{children}</main>
			<Footer />
			{/* </SessionProvider> */}
		</>
	);
}
