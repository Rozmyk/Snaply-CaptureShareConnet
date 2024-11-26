import { Flex, Loader } from '@mantine/core'
interface NewPostsLoaderProps {
	loader: boolean
}
const NewPostsLoader = ({ loader }: NewPostsLoaderProps) => {
	return (
		loader && (
			<Flex justify='center' align='center' m='xs'>
				<Loader color='gray' size='sm' />
			</Flex>
		)
	)
}

export default NewPostsLoader
