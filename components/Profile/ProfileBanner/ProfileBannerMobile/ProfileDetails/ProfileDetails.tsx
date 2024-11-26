import { Grid, Box, Flex, Text, useMantineColorScheme } from '@mantine/core'
import FollowStatusButton from '../../FollowStatusButton/FollowStatusButton'
import MessageButton from '../../MessageButton/MessageButton'
import EditProfile from '../../EditProfile/EditProfile'
interface ProfileDetailsProps {
	username: string
	id: string
	isCurrentUser: boolean
}
const ProfileDetails = ({ username, id, isCurrentUser }: ProfileDetailsProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Grid.Col span={8}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					gap: '10px',
				}}>
				<Flex direction='column' justify='center' align='flex-start' gap='10px'>
					<Text fz={20} color={dark ? 'white' : 'black'}>
						{username}
					</Text>
					<Flex gap='xs'>
						{isCurrentUser ? (
							<>
								<EditProfile />
							</>
						) : (
							<>
								<FollowStatusButton secondUserId={id} />
								<MessageButton id={id} />
							</>
						)}
					</Flex>
				</Flex>
			</Box>
		</Grid.Col>
	)
}

export default ProfileDetails
