import logo from 'public/images/logo.png';
import call from 'public/images/icons/call.svg';
import map from 'public/images/icons/map.svg';
import allPay from 'public/images/icons/all-payments.png';
import amrPay from 'public/images/icons/amar-pay.png';
import arrowIcon from 'public/images/icons/btn-arrow.svg';
import bannerV1 from 'public/images/icons/banner-v-1.svg';
import bannerV2 from 'public/images/icons/banner-v-2.svg';
import quShape from '../../../public/images/shape/card-active-bg-shape.svg';
import rocket from '../../../public/images/icons/rocket.svg';
import yellow from '../../../public/images/icons/yellow.svg';
import green from '../../../public/images/icons/green.svg';
import blue from '../../../public/images/icons/blue.svg';
import mask from '../../../public/images/shape/mask-img.png';
import check from '../../../public/images/icons/check-icon.svg';
import maskPreview from '../../../public/images/shape/mask-show.jpg';
import coaCola from '../../../public/images/icons/partners/cocacola-ico.svg';
import spotify from '../../../public/images/icons/partners/spofify-ico.svg';
import mongoDb from '../../../public/images/icons/partners/mongodb-ico.svg';
import pkoBank from '../../../public/images/icons/partners/pko-bank-ico.svg';
import user from '../../../public/images/icons/user-icon.webp';
import { BsCheckLg, BsFillPlayCircleFill } from 'react-icons/bs';
import { RiMenuFoldLine } from 'react-icons/ri';
import { PiCursorClickFill } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const userIcon = user;
const IMG = {
	logo,
	mask,
	maskPreview,
};

export const ICON = {
	call,
	map,
	yellow,

	blue,
	green,
	amrPay,
	allPay,
	rocket,
	bannerV1,
	bannerV2,
	arrowIcon,
	menu: RiMenuFoldLine,
	play: BsFillPlayCircleFill,
	check,
	checkBox: BsCheckLg,
	x: RxCross2,
	eye: AiOutlineEye,
	eyeClose: AiOutlineEyeInvisible,
};

export const shape = {
	Q: quShape,
};

export const ReactIcon = {
	menu: RiMenuFoldLine,
	play: BsFillPlayCircleFill,
	cursor: PiCursorClickFill,
};

export const PartnersImg = {
	coaCola,
	mongoDb,
	spotify,
	pkoBank,
};

export default IMG;
