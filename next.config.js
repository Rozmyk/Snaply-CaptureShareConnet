/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
		],
	},

	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.node$/,
			use: 'node-loader',
		})

		config.resolve.extensions.push('.node')

		if (isServer) {
			config.externals = [
				...config.externals,
				({ request }, callback) => {
					if (request.endsWith('.node')) {
						callback(null, `commonjs ${request}`)
					} else {
						callback()
					}
				},
			]
		}

		return config
	},
}

module.exports = nextConfig
