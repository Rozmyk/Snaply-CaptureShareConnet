import { Skeleton, Flex } from '@mantine/core'

const SingleNotificationLoading = () => {
	return (
		<Flex direction='row' justify='space-between' align='center' gap='sm' w={'100%'}>
			<Skeleton height={50} circle />
			<Skeleton height={20} w={'80%'} radius='xl' />
		</Flex>
	)
}

export default SingleNotificationLoading
