import { Flex, Container, Skeleton } from '@mantine/core'
const SinglePostLoading = () => {
	return (
		<Container sx={{ maxWidth: '450px' }} mt='xl' mb='xl'>
			<Flex mb='lg' justify='flex-start' align='center' gap='sm'>
				<Skeleton height={38} circle />
				<Flex direction='column' justify='center' align='flex-start' gap='5px'>
					<Skeleton w={150} height={8} radius='xl' />
					<Skeleton w={100} height={6} radius='xl' />
				</Flex>
			</Flex>
			<Skeleton radius='5px' h={400}></Skeleton>
		</Container>
	)
}

export default SinglePostLoading
