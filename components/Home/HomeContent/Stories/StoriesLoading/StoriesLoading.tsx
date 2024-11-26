import { Skeleton, Flex } from '@mantine/core'
const StoriesLoading = () => {
	return (
		<Flex gap={'sm'} style={{ marginTop: 15 }}>
			<Skeleton w={56} radius={'50%'} h={56}></Skeleton>
			<Skeleton w={56} radius={'50%'} h={56}></Skeleton>
			<Skeleton w={56} radius={'50%'} h={56}></Skeleton>
			<Skeleton w={56} radius={'50%'} h={56}></Skeleton>
			<Skeleton w={56} radius={'50%'} h={56}></Skeleton>
		</Flex>
	)
}

export default StoriesLoading
