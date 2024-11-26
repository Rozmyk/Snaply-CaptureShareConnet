import { Text } from '@mantine/core'
import Image from 'next/image'
import LogoBlack from '../../../public/logoBlack.svg'
const RegisterHeader = () => {
	return (
		<>
			<Image src={LogoBlack} width={115} alt='Snaply logo'></Image>
			<Text align='center' color='#737373' fw={500} mt='sm' mb='sm'>
				Sign up to see photos and videos from your friends.
			</Text>
		</>
	)
}

export default RegisterHeader
