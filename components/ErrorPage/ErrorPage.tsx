import { Text, Flex, Container, Anchor } from '@mantine/core'
const ErrorPage = () => {
	return (
		<Container p='xl'>
			<Flex direction='column' justify='center' align='center'>
				<Text fz={24} fw={700} mb='lg'>
					Sorry, this page isn&apos;t available.
				</Text>
				<Text>
					The link you followed may be broken, or the page may have been removed.
					<Anchor href='/'> Go back to Snaply.</Anchor>
				</Text>
			</Flex>
		</Container>
	)
}

export default ErrorPage
