import style from './Register.style.module.css';

function RoleButton({
	dispatch,
	state,
	label = 'User',
}: {
	dispatch: any;
	state: any;
	label?: string | null;
}) {
	let value = '4';
	if (label === 'Vendor') {
		value = '2';
	} else if (label === 'Affiliate') {
		value = '3';
	} else {
		value = '4';
	}

	return (
		<button
			onClick={() => {
				dispatch({
					type: 'INPUT',
					payload: {
						value: value,
						name: 'role',
					},
				});
			}}
			type="button"
			className={`${style.userItems} ${
				state.data.role === value && style.active
			}`}
		>
			{label}
		</button>
	);
}

export default RoleButton;
