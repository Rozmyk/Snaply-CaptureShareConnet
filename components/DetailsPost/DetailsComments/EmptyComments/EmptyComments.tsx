import { Flex, Text, useMantineColorScheme } from '@mantine/core'

const EmptyComments = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex direction='column' h={300} mt='lg' justify='center' align='center'>
			<Text fz={24} fw={600} color={dark ? 'white' : 'black'}>
				No comments yet.
			</Text>
			<Text fz={14}>Start the conversation.</Text>
		</Flex>
	)
}

export default EmptyComments
