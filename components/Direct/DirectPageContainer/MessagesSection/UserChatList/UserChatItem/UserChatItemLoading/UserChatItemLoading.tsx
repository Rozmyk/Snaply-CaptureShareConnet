import { Flex, Skeleton } from '@mantine/core'

const UserChatItemLoading = () => {
	return (
		<Flex justify='space-around'  align='center' w='100%' h='75px'>
			<Skeleton height={55} width={55} circle  />

			<Flex direction='column' w='60%' justify='center' align='center'>
				<Skeleton height={15}  mt={6} radius='xl' />
				<Skeleton height={12} mt={6} radius='xl' />
			</Flex>
		</Flex>
	)
}

export default UserChatItemLoading
