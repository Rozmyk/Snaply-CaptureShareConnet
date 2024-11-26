import { Box, Flex, Title, Tooltip, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import EditProfile from '../EditProfile/EditProfile'
import ProfileSetting from '../ProfileSetting/ProfileSetting'
import MessageButton from '../MessageButton/MessageButton'
import ProfileCustomButton from '../../ProfileCustomButton/ProfileCustomButton'
import FollowStatusButton from '../FollowStatusButton/FollowStatusButton'

interface ProfileInfoProps {
	username: string
	isCurrentUser: boolean
	id: string
}
const ProfileInfo = ({ username, isCurrentUser, id }: ProfileInfoProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'flex-start',
				gap: '10px',
			}}>
			<Flex mb='xs' justify='center' align='center' gap='10px'>
				<Title order={2} fw={400} fz={20} color={dark ? 'white' : 'black'}>
					{username}
				</Title>
				{isCurrentUser ? (
					<>
						<EditProfile />
						<Tooltip withArrow position='right' label='The option is currently unavailable'>
							<div>
								<ProfileCustomButton onClick={() => {}}>View archive</ProfileCustomButton>
							</div>
						</Tooltip>
						<ProfileSetting />
					</>
				) : (
					<>
						<FollowStatusButton secondUserId={id} />
						<MessageButton id={id} />
						<ActionIcon>
							<IconDots />
						</ActionIcon>
					</>
				)}
			</Flex>
		</Box>
	)
}

export default ProfileInfo
