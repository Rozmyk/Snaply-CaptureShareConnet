import { Flex, Avatar, Text, ActionIcon } from '@mantine/core'
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react'
import getTimeDifference from '../../../../../../../../../../utils/getTimeDifference'
import { UserProps } from '../../../../../../../../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface CustomHighlightHeaderProps {
	isPaused: boolean
	action: (action: string) => void
	story: {
		duration: number
		url: string
		user: UserProps
		createdAt: Timestamp
		id: string
		content: (props: any) => JSX.Element
	}
}
const CustomHighlightHeader = ({ isPaused, action, story }: CustomHighlightHeaderProps) => {
	return (
		<>
			<Flex
				justify='space-between'
				align='center'
				sx={{ position: 'absolute', top: 10, right: 0, left: 0, zIndex: 5000, width: 300 }}
				p='sm'>
				<Flex justify='flex-start' align='center' gap='5px'>
					<Avatar size={32} radius={'50%'} src={story.user.image}></Avatar>
					<Text color='white' fz='sm' fw={600}>
						{story.user.username}
					</Text>
					<Text fz='sm' color='#c6c7c6'>
						{getTimeDifference(story.createdAt)}
					</Text>
				</Flex>
				<Flex gap='xs'>
					{!isPaused ? (
						<ActionIcon
							onClick={() => {
								action('pause')
							}}>
							<IconPlayerPauseFilled style={{ color: 'white' }}></IconPlayerPauseFilled>
						</ActionIcon>
					) : (
						<ActionIcon
							onClick={() => {
								action('resume')
							}}>
							<IconPlayerPlayFilled style={{ color: 'white' }}></IconPlayerPlayFilled>
						</ActionIcon>
					)}
				</Flex>
			</Flex>
		</>
	)
}

export default CustomHighlightHeader
