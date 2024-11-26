import { Loader, Flex } from '@mantine/core'

const MorePostLoading = () => {
	return (
		<Flex justify='center' align='center' w='100%' h='100%'>
			<Loader size='sm' color='gray' />
		</Flex>
	)
}

export default MorePostLoading
