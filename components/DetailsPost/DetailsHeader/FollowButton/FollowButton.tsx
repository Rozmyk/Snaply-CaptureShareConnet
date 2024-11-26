import { Anchor, Text } from '@mantine/core'

interface FollowButtonProps {
	isFollowed: boolean
	userId: string
	addedBy: string
	dark: boolean
	addFollow: (followingId: string) => Promise<void>
}

const FollowButton = ({ isFollowed, userId, addedBy, dark, addFollow }: FollowButtonProps) => (
	<>
		{!isFollowed && userId !== addedBy && (
			<>
				<Text fz='sm' color={dark ? 'gray.0' : 'gray.9'}>
					•
				</Text>
				<Anchor type='button' sx={{ fontWeight: 600 }} size='sm' onClick={() => addFollow(addedBy)}>
					Follow
				</Anchor>
			</>
		)}
	</>
)

export default FollowButton
