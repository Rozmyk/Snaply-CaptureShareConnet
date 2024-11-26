import { Skeleton, Flex } from '@mantine/core'
const SingleCommentDetailsLoading = () => {
	return (
		<Flex mt='sm' p='xs' gap='sm' justify='flex-start' align='flex-start' w='100%'>
			<Skeleton circle style={{ borderRadius: '50%', height: 40, width: 40 }} />
			<Skeleton height={55} width={'80%'}></Skeleton>
		</Flex>
	)
}

export default SingleCommentDetailsLoading
