import { Stack, Skeleton, Flex } from '@mantine/core'

const DetailedMessageLoading = () => {
	return (
		<Flex justify='center' align='center' h={'100%'}>
			<Stack w={300} align='center'>
				<Skeleton radius='50%' h={70} w={70}></Skeleton>
				<Skeleton height={20} radius='xl' w={'50%'} />
				<Skeleton height={10} radius='xl' w={'80%'} />
                <Skeleton height={16} radius='sm' w={'35%'} />
			</Stack>
		</Flex>
	)
}

export default DetailedMessageLoading
