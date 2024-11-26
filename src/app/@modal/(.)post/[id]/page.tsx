'use client'
import { useState, useEffect } from 'react'
import { Modal, CloseButton, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { getPostData } from '../../../../../utils/getPostData'
import { fetchUserData } from '../../../../../utils/user/fetchUserData'
import DetailsPostModal from '../../../../../components/DetailsPost/DetailsPostModal/DetailsPostModal'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { DescriptionDataProps, UserProps, PostProps } from '../../../../../types'
export default function PhotoModal({ params: { id: postId } }: { params: { id: string } }) {
	const [postData, setPostData] = useState<PostProps | null>(null)
	const [descriptionData, setDescriptionData] = useState<DescriptionDataProps | null>(null)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const onClose = () => {
		router.back()
	}
	useEffect(() => {
		const fetchPostData = async () => {
			const fetchedPostData = await getPostData(postId)

			setPostData(fetchedPostData)
			let fetchedUserData
			if (fetchedPostData?.addedBy) {
				fetchedUserData = await fetchUserData(fetchedPostData.addedBy)
			}

			if (fetchedUserData) {
				setUserData(fetchedUserData)
			}

			if (fetchedPostData && fetchedUserData) {
				setDescriptionData({
					createdAt: fetchedPostData.createdAt,
					username: fetchedUserData.username,
					userImage: fetchedUserData.image,
					caption: fetchedPostData.caption,
					addedBy: fetchedUserData.id,
					mentionedUsers: fetchedPostData.mentionedUsers,
					mentionedTags: fetchedPostData.mentionedTags,
				})
			}
			setLoading(false)
		}
		fetchPostData()
	}, [postId])
	return (
		<Modal.Root padding={0} size='90%' opened={true} onClose={onClose}>
			<Modal.Overlay>
				<ActionIcon
					onClick={e => {
						e.stopPropagation()
						onClose()
					}}
					variant='transparent'
					sx={{
						position: 'absolute',
						top: 0,
						right: 0,
						margin: '15px',
						zIndex: 206,
						color: 'white',
					}}
					size='xl'>
					<IconX />
				</ActionIcon>
			</Modal.Overlay>
			<Modal.Content style={{ backgroundColor: dark ? 'black' : 'white', overflow: 'hidden' }}>
				<Modal.Body m={0} p={0}>
					{descriptionData && (
						<DetailsPostModal
							descriptionData={descriptionData}
							postId={postId}
							postData={postData}
							userData={userData}
							loading={loading}
						/>
					)}
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
