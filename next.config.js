const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

const withBundleAnalyzer =
	process.env.ANALYZE === 'true'
		? require('@next/bundle-analyzer')({
			enabled: true,
		})
		: (config) => config;

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' googletagmanager.com *.googletagmanager.com vercel-insights.com *.vercel-insights.com;
  child-src *.googletagmanager.com *.vercel-insights.com;
  style-src 'self' 'unsafe-inline' googleapis.com *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' gstatic.com *.gstatic.com;
`;

const securityHeaders = [
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\n/g, ''),
	},
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin',
	},
	{
		key: 'X-Frame-Options',
		value: 'DENY',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=31536000; includeSubDomains; preload',
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=()',
	},
];

module.exports = withPlugins([[withBundleAnalyzer], [withImages]], {
	webpack(config, options) {
		config.resolve.modules.push(path.resolve('./'));
		return config;
	},
	async headers() {
		return [
			{ source: '/', headers: securityHeaders },
			{ source: '/:path*', headers: securityHeaders },
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,POST',
					},
					// eslint-disable-next-line max-len
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
});
