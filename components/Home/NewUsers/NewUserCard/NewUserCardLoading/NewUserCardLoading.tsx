import { Flex, Skeleton } from '@mantine/core'
const NewUserCardLoading = () => {
	return (
		<Flex justify='space-between' align='center' w={'100%'} pb='sm' pt='sm'>
			<Skeleton height={44} width={44} radius='50%'></Skeleton>
			<Skeleton height={20} w={'75%'} radius='lg'></Skeleton>
		</Flex>
	)
}

export default NewUserCardLoading
