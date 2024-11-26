'use client'
import React from 'react'
import { useEffect } from 'react'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useSession } from 'next-auth/react'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const { status } = useSession()
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	})

	const toggleColorScheme = (value?: ColorScheme) => {
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
	}
	useEffect(() => {
		if (status === 'unauthenticated') {
			setColorScheme('light')
		}
	}, [status, setColorScheme])
	return (
		<MantineProvider
			theme={{
				colorScheme,
				// primaryColor: 'newPrimary',
				// colors: {
				// 	dark: [
				// 		'lemon',
				// 		'yellow',
				// 		'#A8A8A8', //text
				// 		'#A8A8A8', //input
				// 		'#262626',
				// 		'#262626', //seperator
				// 		'#272726',
				// 		'#272726						',
				// 		'#010100',
				// 		'pink',
				// 	],
				// 	newPrimary: [
				// 		'#e1f9ff',
				// 		'#ccedff',
				// 		'#9ad7ff',
				// 		'#64c1ff',
				// 		'#3baefe',
				// 		'#20a2fe',
				// 		'#099cff',
				// 		'#0088e4',
				// 		'#0079cd',
				// 		'#0069b6',
				// 	],
				// },
			}}
			withGlobalStyles
			withCSSVariables
			withNormalizeCSS>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				{children}
			</ColorSchemeProvider>
		</MantineProvider>
	)
}
