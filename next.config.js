/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'sos.mdperves.com',
			'swiperjs.com',
			process.env.NEXT_PUBLIC_CONFIG,
		],
	},
	reactStrictMode: true,
	experimental: { esmExternals: true },
};

module.exports = nextConfig;
