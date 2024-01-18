import style from './Input.module.css';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
export interface IInput {
	type?: string | undefined;
	name: any;
	label: any;
	dispatch: any;
	state: any;
	placeholder: any;
	tabIndex?: number;
}
function Input({
	type = 'text',
	name,
	label,
	dispatch,
	state,
	placeholder,
	tabIndex,
}: IInput) {
	const [eye, setEye] = useState(false);
	return (
		<div className={style.inputWrap}>
			<label className={style.loginLabel} htmlFor={name}>
				{label} <span>{state.error[name]}</span>
			</label>
			<input
				onChange={(e) => {
					dispatch({
						type: 'INPUT',
						payload: {
							value: e.target.value ? e.target.value.trim() : null,
							name: name,
						},
					});
				}}
				id={name}
				name={name}
				className={`${style.loginInput} ${
					(state?.error?.[name] || state?.resError?.[name]) && style?.error
				}`}
				placeholder={placeholder}
				type={eye ? 'text' : type}
			/>
			{type === 'password' && (
				<button
					tabIndex={3}
					type="button"
					onClick={() => setEye((e) => !e)}
					className={style.eyeIcon}
				>
					{eye ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
				</button>
			)}
		</div>
	);
}

export default Input;
