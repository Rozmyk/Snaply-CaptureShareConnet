import { Group, Anchor, Flex, useMantineColorScheme } from '@mantine/core'
interface FooterInterface {
	compact?: boolean
}
const Footer = ({ compact }: FooterInterface) => {
	const { colorScheme } = useMantineColorScheme()
	const todayDate = new Date()
	const year = todayDate.getFullYear()
	const fakeAnchors = [
		'Snaply',
		'About',
		'Blog',
		'Jobs',
		'Help',
		'API',
		'Privacy',
		'Cookie Settings',
		'Terms',
		'Locations',
	]
	return (
		<Flex
			mt={compact ? '25px' : '100px'}
			mb='xl'
			justify='center'
			align={compact ? 'flex-start' : 'center'}
			direction='column'
			gap='md'>
			<Group spacing={compact ? 'xs' : 'xl'} position={compact ? 'left' : 'center'}>
				{fakeAnchors.map(fakeAnchor => {
					return (
						<Anchor key={fakeAnchor} href='/' color={colorScheme == 'dark' ? '#737272' : '#C7c7c7'} size='12px'>
							{fakeAnchor}
						</Anchor>
					)
				})}
			</Group>
			<Group>
				<Anchor href='/' color={colorScheme == 'dark' ? '#737272' : '#C7c7c7'} size='12px'>
					© {year} Snaply
				</Anchor>
				<Anchor href='https://github.com/Rozmyk' color={colorScheme == 'dark' ? '#737272' : '#C7c7c7'} size='12px'>
					Made by Rozmyk
				</Anchor>
			</Group>
		</Flex>
	)
}

export default Footer
