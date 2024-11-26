'use client'
import { Grid, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import MessageSection from '../../../components/Direct/DirectPageContainer/MessagesSection/MessageSection'

export default function DirectLayout({ children }: { children: React.ReactNode }) {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isXXlScreen = useMediaQuery('(min-width: 1400px)')
	const isXLScreen = useMediaQuery('(min-width: 1200px) and (max-width: 1399px)')
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return isSmallScreen ? (
		<div>{children}</div>
	) : (
		<Grid h='99vh' w='100%' m='0' p='0' mah='100vh'>
			<Grid.Col
				span={isXXlScreen ? 3 : isXLScreen ? 4 : 5}
				p={0}
				sx={{ borderRight: `1px solid ${dark ? '#232323' : '#dadbda'}` }}>
				<MessageSection />
			</Grid.Col>
			<Grid.Col span={isXXlScreen ? 9 : isXLScreen ? 8 : 7} h='100%' m={0} p={0}>
				{children}
			</Grid.Col>
		</Grid>
	)
}
