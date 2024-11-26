import { Flex, Box } from '@mantine/core'
const UserCardLoading = () => {
	return (
		<Flex p='sm' justify='space-between' align='center'>
			<Flex justify='flex-start' align='center' gap='10px'>
				<Box sx={{ height: 50, width: 50, borderRadius: '50%', backgroundColor: '#1a1a1a' }} />
				<Flex direction='column'>
					<Box sx={{ height: 15, width: 100, borderRadius: '10px', backgroundColor: '#1a1a1a' }} />
					<Box sx={{ height: 12, width: 45, borderRadius: '10px', backgroundColor: '#1a1a1a' }} mt={5} />
				</Flex>
			</Flex>
			<Box sx={{ backgroundColor: '#1a1a1a', borderRadius: '10px', height: 30, width: 75 }}></Box>
		</Flex>
	)
}

export default UserCardLoading
