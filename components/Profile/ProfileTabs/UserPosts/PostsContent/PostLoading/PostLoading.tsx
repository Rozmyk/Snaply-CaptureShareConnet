import { Flex, Loader } from '@mantine/core'
const PostLoading = () => {
	return (
		<Flex justify='center' align='center' mt='xl' w='100%'>
			<Loader mt='lg' color='gray' size='sm'></Loader>
		</Flex>
	)
}

export default PostLoading
