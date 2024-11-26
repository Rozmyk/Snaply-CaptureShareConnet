'use client'
import { Modal, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import { checkIfUserFollowed } from '../../utils/checkIfUserFollowed'
import { useSession } from 'next-auth/react'
import ViewerActions from './ViewerActions/ViewerActions'
import AuthorActions from './AuthorActions/AuthorActions'

interface PostModalSettingsProps {
	postId: string
	addedBy: string
	hideLikes: boolean
	turnOffComments: boolean
}
const PostModalSettings = ({ postId, addedBy, hideLikes, turnOffComments }: PostModalSettingsProps) => {
	const [opened, { open, close }] = useDisclosure(false)
	const [isFollowed, setIsFollowed] = useState(false)

	const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false)
	const session = useSession()
	const { colorScheme } = useMantineColorScheme()

	const dark = colorScheme === 'dark'
	const userId = session.data?.user?.id

	useEffect(() => {
		const fetchIsFollowed = async () => {
			if (userId && addedBy) {
				const followed = await checkIfUserFollowed(userId, addedBy)
				followed ? setIsFollowed(true) : setIsFollowed(false)
			}
		}

		fetchIsFollowed()
	}, [userId, addedBy])

	useEffect(() => {
		if (addedBy === userId) {
			setIsCurrentUserAuthor(true)
		}
	}, [addedBy, userId])

	return (
		<>
			<Modal
				opened={opened}
				radius='lg'
				centered
				onClose={close}
				sx={{
					overflow: 'hidden',

					'.mantine-Modal-content	': {
						backgroundColor: dark ? '#262626' : '#fffefe',
					},
				}}
				padding={'5px'}
				withCloseButton={false}>
				{isCurrentUserAuthor ? (
					<AuthorActions
						dark={dark}
						turnOffComments={turnOffComments}
						hideLikes={hideLikes}
						postId={postId}
						close={close}
					/>
				) : (
					<ViewerActions
						postId={postId}
						isFollowed={isFollowed}
						setIsFollowed={setIsFollowed}
						close={close}
						addedBy={addedBy}
					/>
				)}
			</Modal>

			<ActionIcon size='sm' onClick={open}>
				<IconDots color={dark ? '#f5f5f5' : 'black'} />
			</ActionIcon>
		</>
	)
}

export default PostModalSettings
