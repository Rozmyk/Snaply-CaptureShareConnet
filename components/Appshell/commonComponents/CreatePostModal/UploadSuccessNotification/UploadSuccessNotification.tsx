import { Flex, Text } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

const UploadSuccessNotification = () => {
	return (
		<Flex justify='center' direction='column' align='center' sx={{ height: '100%', width: '100%' }}>
			<IconCircleCheck size='7rem' stroke={0.75} color='#1971c2' />
			<Text color='#f5f5f5' fw={400} fz='20px'>
				Your post has been posted
			</Text>
		</Flex>
	)
}

export default UploadSuccessNotification
