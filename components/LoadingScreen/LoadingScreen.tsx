import { Container, Loader, Flex, Text, useMantineColorScheme } from '@mantine/core'
import Image from 'next/image'
import WhiteLogo from '../../public/logoIcon.svg'
import BlackLogo from '../../public/logoIconBlack.svg'
const LoadingScreen = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Container
			sx={{
				width: '100vw',
				height: '100vh',
				maxWidth: '100vw',
				maxHeight: '100vh',
				position: 'absolute',
				backgroundColor: dark ? 'black' : 'white',
			}}>
			<Flex justify='center' direction='column' align='center' w='100%' h='100%'>
				<Image src={dark ? WhiteLogo : BlackLogo} alt='Snaply Logo' height={50}></Image>
			</Flex>
			<Flex
				direction='column'
				align='center'
				justify='center'
				p='sm'
				sx={{
					position: 'absolute',
					bottom: 0,
					left: '50%',
					transform: 'translateX(-50%)',
				}}>
				<Loader mb='50px' size='sm' color='gray' />
				<Text color={dark ? '#a8a8a8' : '#737373'} fw={500} fz='sm'>
					from
				</Text>
				<Text fw={700} fz='lg'>
					Rozmyk
				</Text>
			</Flex>
		</Container>
	)
}

export default LoadingScreen
