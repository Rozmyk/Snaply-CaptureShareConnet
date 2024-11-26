import { Flex } from '@mantine/core'
import Image from 'next/image'
import LogoBlack from '../../../public/logoBlack.svg'
const Navbar = () => {
	return (
		<Flex
			justify='flex-start'
			p='md'
			align='center'
			sx={{ width: '100%', height: 60, borderBottom: '1px solid #dadadb' }}>
			<Image alt='Snaply logo' height={25} src={LogoBlack}></Image>
		</Flex>
	)
}

export default Navbar
