import localFont from 'next/font/local'
import { Roboto, Avenir_Next } from 'next/font/google'

export const roboto = Roboto({
	weight: ['500'], // Medium
	subsets: ['latin'],
	variable: '--font-roboto',
})

export const avenirNext = Avenir_Next({
	weight: ['600'], // Demi Bold
	subsets: ['latin'],
	variable: '--font-avenir-next',
})
