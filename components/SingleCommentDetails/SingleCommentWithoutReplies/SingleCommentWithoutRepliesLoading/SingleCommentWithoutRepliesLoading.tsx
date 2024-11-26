import { Skeleton, Flex } from '@mantine/core'
const SingleCommentWithoutRepliesLoading = () => {
	return (
		<Flex w='100%' h='100%' p='xs' justify='flex-start' align='center' gap='md'>
			<Skeleton height={35} circle />

			<Skeleton height={15} radius='xl' w={'60%'} />
		</Flex>
	)
}

export default SingleCommentWithoutRepliesLoading
