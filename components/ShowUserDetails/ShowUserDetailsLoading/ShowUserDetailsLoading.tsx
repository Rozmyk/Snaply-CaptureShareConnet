import { Box, Skeleton, Flex, Center } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'

const ShowUserDetailsLoading = () => {
	const { ref, width, height } = useElementSize()
	const photoSize = width / 3

	return (
		<Box sx={{ width: '100%', height: '100%', padding: 5 }}>
			<Flex justify='space-between' align='center'>
				<Flex justify='flex-start' align='center' gap='15px'>
					<Skeleton height={45} circle></Skeleton>
					<Skeleton width={100} h={20}></Skeleton>
				</Flex>
			</Flex>
			<Skeleton height={50} width={'100%'} />
			<Flex w={'100%'} mb='sm' gap='2px'>
				<Skeleton height={photoSize}></Skeleton>
				<Skeleton width={photoSize} height={photoSize}></Skeleton>
				<Skeleton width={photoSize} height={photoSize}></Skeleton>
			</Flex>
			<Center>
				<Skeleton height={30} width={'90%'}></Skeleton>
			</Center>
		</Box>
	)
}

export default ShowUserDetailsLoading
