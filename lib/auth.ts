import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { fetchUserData } from '../utils/user/fetchUserData'
import { fetchUserDataByEmail } from '../utils/user/fetchUserDataByEmail'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {},
			async authorize(credentials): Promise<any> {
				return await signInWithEmailAndPassword(
					auth,
					(credentials as any).email || '',
					(credentials as any).password || ''
				)
					.then(userCredential => {
						if (userCredential.user) {
							return userCredential.user
						}
						return null
					})
					.catch(error => {
						console.error(error)
						return null
					})
			},
		}),
	],
	callbacks: {
		async session({ session, token }: { session: any; token: any }) {
			if (token?.id) {
				const userData = await fetchUserData(token.id)

				if (userData) {
					session.user = {
						id: userData.id,
						name: userData.name,
						email: userData.email,
						image: userData.image || null,
						username: userData.username || null,
						following: userData.following || [],
						followers: userData.followers || [],
						completed: userData.completed || false,
						description: userData.description || null,
						descriptionLink: userData.descriptionLink || null,
						private: userData.private || false,
					}
				}
			} else if (token?.email) {
				const user = await fetchUserDataByEmail(token.email)
				if (user) {
					session.user = {
						id: user.id,
						name: user.name,
						email: user.email,
						image: user.image || null,
						username: user.username || null,
						following: user.following || [],
						followers: user.followers || [],
						completed: user.completed || false,
						description: user.description || null,
						descriptionLink: user.descriptionLink || null,
						private: user.private || false,
					}
				}
			}

			return session
		},
		async jwt({ token, user }: { token: any; user?: any }) {
			if (user) {
				token.id = user.id
				token.email = user.email
			}
			return token
		},
	},
}

export default NextAuth(authOptions)
