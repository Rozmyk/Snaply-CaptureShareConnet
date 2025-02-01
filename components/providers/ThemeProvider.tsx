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
		defaultValue: 'dark',
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
