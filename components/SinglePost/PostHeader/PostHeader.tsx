import { Flex, Text, Avatar, useMantineColorScheme } from '@mantine/core'
import getTimeDifference from '../../../utils/getTimeDifference'
import PostModalSettings from '../../PostModalSettings/PostModalSettings'
import { Timestamp } from 'firebase-admin/firestore'
import ShowUserDetails from '../../ShowUserDetails/ShowUserDetails'
import Link from 'next/link'
interface SinglePostHeaderProps {
	userPhoto: string
	username: string
	createdAt: Timestamp
	postId: string
	addedBy: string
	hideLikes: boolean
	turnOffComments: boolean
}

const PostHeader = ({
	userPhoto,
	username,
	createdAt,
	postId,
	addedBy,
	hideLikes,
	turnOffComments,
}: SinglePostHeaderProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Flex mb='sm' mt='sm' justify='space-between' align='center'>
			<Flex justify='flex-start' align='center' gap='5px'>
				<ShowUserDetails userDetailsId={addedBy}>
					<Link href={`/profile/${username}`} style={{ textDecoration: 'none' }}>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
							<Avatar src={userPhoto} size={30} sx={{ borderRadius: '50%' }}></Avatar>
							<Text fz='sm' color={dark ? 'white' : '#000000'} fw={600}>
								{username}
							</Text>
						</div>
					</Link>
				</ShowUserDetails>

				<Text fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
					•
				</Text>

				<Text fz='sm' color={dark ? '#a8a8a8' : '#737373'}>
					{getTimeDifference(createdAt)}
				</Text>
			</Flex>
			<PostModalSettings turnOffComments={turnOffComments} hideLikes={hideLikes} postId={postId} addedBy={addedBy} />
		</Flex>
	)
}

export default PostHeader
