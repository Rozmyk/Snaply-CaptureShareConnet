import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			name: string
			email: string
			image: string | null
			username: string | null
			following?: string[]
			followers?: string[]
			completed?: boolean
			description?: string | null
			descriptionLink?: string | null
			private?: boolean
		}
	}

	interface User {
		id: string
		name: string
		email: string
		image?: string
		username?: string
	}

	interface JWT {
		id: string
		email: string
	}
}
