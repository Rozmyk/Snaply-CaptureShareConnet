import { BackgroundImage, Flex, Avatar, Text } from '@mantine/core'
import getTimeDifference from '../../../../../../../../../utils/getTimeDifference'
import { Timestamp } from 'firebase-admin/firestore'

interface MiniHighlightProps {
	imageSrc: string
	highlightName: string
	createdAt: Timestamp
}

const MiniHighlight = ({ imageSrc, highlightName, createdAt }: MiniHighlightProps) => {
	const truncateName = (name: string, maxLength: number) => {
		return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
	}

	return (
		<BackgroundImage src={imageSrc}>
			<Flex w={'100%'} h={'100%'} direction='column' justify='center' align='center'>
				<Avatar sx={{ border: '1px solid black' }} radius='50%' size={100} src={imageSrc}></Avatar>
				<Text fz='25px' fw={500} sx={{ textTransform: 'capitalize', color: 'white' }}>
					{truncateName(highlightName, 10)}
				</Text>
				<Text sx={{ color: 'white' }} fz='xl'>
					{getTimeDifference(createdAt)}
				</Text>
			</Flex>
		</BackgroundImage>
	)
}

export default MiniHighlight
