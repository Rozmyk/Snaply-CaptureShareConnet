import { BackgroundImage, Flex, Avatar, Text } from '@mantine/core'
import { UserProps } from '../../../../../../../types'
import getTimeDifference from '../../../../../../../utils/getTimeDifference'
import { Timestamp } from 'firebase-admin/firestore'
interface MiniStoryProps {
	imageSrc: string
	userData: UserProps
	createdAt: Timestamp
}
const MiniStory = ({ imageSrc, userData, createdAt }: MiniStoryProps) => {
	return (
		<BackgroundImage src={imageSrc}>
			<Flex w={'100%'} h={'100%'} direction='column' justify='center' align='center'>
				<Avatar radius='50%' size={100} src={userData.image}></Avatar>
				<Text fz='25px' fw={500} sx={{ textTransform: 'capitalize', color: 'white' }}>
					{userData.username}
				</Text>
				<Text fz='xs' sx={{ color: 'white' }}>
					{getTimeDifference(createdAt)}
				</Text>
			</Flex>
		</BackgroundImage>
	)
}

export default MiniStory
