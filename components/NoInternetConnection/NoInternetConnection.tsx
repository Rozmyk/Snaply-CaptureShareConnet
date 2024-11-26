import { IconRotateClockwise } from '@tabler/icons-react'
import { Container, Flex, Button, Text } from '@mantine/core'
const NoInternetConnection = () => {
	const handleRefresh = () => {
		location.reload()
	}
	return (
		<Container w='100vw' h='100vh'>
			<Flex direction='column' justify='center' align='center' h='100%'>
				<IconRotateClockwise size='75px' />
				<Text fw={500} fz='xl'>
					No Internet Connection
				</Text>
				<Button onClick={handleRefresh} mt='xl'>
					Refresh
				</Button>
			</Flex>
		</Container>
	)
}

export default NoInternetConnection
