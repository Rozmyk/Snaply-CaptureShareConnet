import { IconLock } from '@tabler/icons-react'
import { Flex, Text, useMantineColorScheme } from '@mantine/core'
const PrivateAccount = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex direction='column' align='center' justify='center' p='lg'>
			<Flex
				mb='sm'
				justify='center'
				align='center'
				p='xs'
				sx={{ borderRadius: '50%', border: dark ? '1px solid white' : '1px solid black' }}>
				<IconLock size={35} stroke={1} />
			</Flex>
			<Text color={dark ? 'white' : 'black'} fw={600}>
				This account is private
			</Text>
			<Text align='center' fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
				Follow this account to see the photos added there
			</Text>
		</Flex>
	)
}

export default PrivateAccount
