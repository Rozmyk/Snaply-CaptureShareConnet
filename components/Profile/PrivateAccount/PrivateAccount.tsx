import { Flex, Text, Center } from '@mantine/core'
import { IconLock } from '@tabler/icons-react'
const PrivateAccount = () => {
	return (
		<Center>
			<Flex sx={{ maxWidth: 350 }} direction='column' justify='center' align='center' mt='50px' gap='sm'>
				<Flex
					justify='center'
					align='center'
					sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #262626' }}>
					<IconLock stroke={1} size={40} color='#262626' />
				</Flex>
				<Text fz={30} fw={800}>
					This account is private
				</Text>
				<Text fz={14}>Follow to see their photos and videos.</Text>
			</Flex>
		</Center>
	)
}

export default PrivateAccount
