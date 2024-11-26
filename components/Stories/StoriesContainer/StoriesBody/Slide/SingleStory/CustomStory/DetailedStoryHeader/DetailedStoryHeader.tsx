import { Flex, Avatar, Text, ActionIcon } from '@mantine/core'
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconX } from '@tabler/icons-react'
import getTimeDifference from '../../../../../../../../utils/getTimeDifference'
import { UserProps } from '../../../../../../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface DetailedStoryHeaderProps {
	isPaused: boolean
	action: (action: string) => void
	width: number | string
	closeButtonAction: () => void
	story: {
		duration: number
		url: string
		user: UserProps
		createdAt: Timestamp
		id: string
		content: (props: any) => JSX.Element
	}
}
const DetailedStoryHeader = ({ isPaused, action, story, width, closeButtonAction }: DetailedStoryHeaderProps) => {
	return (
		<>
			<Flex
				justify='space-between'
				align='center'
				sx={{ position: 'absolute', top: 10, right: 0, left: 0, zIndex: 5000, width: width }}
				p='sm'>
				<Flex justify='flex-start' align='center' gap='5px'>
					<Avatar size={32} radius={'50%'} src={story.user.image}></Avatar>
					<Text fz={14} fw={600} color='white'>
						{story.user.username}
					</Text>
					<Text fz={14} color='white' sx={{ opacity: 0.6 }}>
						{getTimeDifference(story.createdAt)}
					</Text>
				</Flex>
				<Flex gap='xs'>
					{!isPaused ? (
						<ActionIcon
							size='lg'
							onClick={() => {
								action('pause')
							}}>
							<IconPlayerPauseFilled size={30} style={{ color: 'white' }}></IconPlayerPauseFilled>
						</ActionIcon>
					) : (
						<ActionIcon
							size='lg'
							onClick={() => {
								action('resume')
							}}>
							<IconPlayerPlayFilled size={30} style={{ color: 'white' }}></IconPlayerPlayFilled>
						</ActionIcon>
					)}
					{closeButtonAction && (
						<ActionIcon size='lg' onClick={closeButtonAction}>
							<IconX size={30} style={{ color: 'white' }} />
						</ActionIcon>
					)}
				</Flex>
			</Flex>
		</>
	)
}

export default DetailedStoryHeader
