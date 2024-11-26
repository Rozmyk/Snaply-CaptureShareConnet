'use client'
import { Anchor, Modal, useMantineColorScheme, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import UserCardLoading from '../../../UserCard/UserCardLoading/UserCardLoading'
import { fetchUserData } from '../../../../utils/user/fetchUserData'
import { checkIfUserLikedPost } from '../../../../utils/post/checkIfUserLikedPost'
import ModalHeader from '../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import { useEffect, useState } from 'react'
import { UserProps } from '../../../../types'
import UserCard from '../../../UserCard/UserCard'
import { likePost } from '../../../../utils/post/likePost'
interface LikesProps {
	likes: string[] | null
	userId: string
	postId: string
	postImage: string
	addedBy: string
}

const DetailsLikes = ({ likes, userId, postId, postImage, addedBy }: LikesProps) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [userLiked, setUserLiked] = useState<boolean>(false)
	const [postLikesData, setPostLikesData] = useState<UserProps[] | undefined>([])
	const [opened, { open, close }] = useDisclosure(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const updatedData: UserProps[] = []

				if (likes) {
					for (const like of likes) {
						try {
							const userData: UserProps | undefined = await fetchUserData(like)
							if (userData) {
								updatedData.push(userData)
							} else {
								console.warn(`User data for like ${like} is undefined or invalid.`)
							}
						} catch (error) {
							console.error(`Error fetching user data for like ${like}:`, error)
						}
					}
				}

				setPostLikesData(updatedData)
				setLoading(false)
			} catch (error) {
				console.error('Error while fetching data:', error)
				setLoading(false)
			}
		}
		fetchData()
	}, [likes])
	useEffect(() => {
		const fetchData = async () => {
			if (userId && postId) {
				setUserLiked(await checkIfUserLikedPost(userId, postId))
			}
		}

		fetchData()
	}, [postId, userId])

	return (
		<>
			<Modal.Root centered opened={opened} onClose={close} radius='md'>
				<Modal.Overlay />
				<Modal.Content>
					<ModalHeader closeButton closeButtonAction={close} centerText='Likes' />
					<Modal.Body>
						{loading ? <UserCardLoading /> : postLikesData?.map(user => <UserCard key={user.id} {...user}></UserCard>)}
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<span>
				{!loading && likes && likes.length > 0 ? (
					<Anchor
						mt='sm'
						color={dark ? 'white' : 'black'}
						fz={14}
						component='button'
						type='button'
						onClick={likes.length > 0 ? open : undefined}>
						{likes && likes.length > 0 && postLikesData ? (
							likes.length === 1 ? (
								<>
									Liked by <span style={{ fontWeight: 700 }}>{postLikesData[0].username}</span>
								</>
							) : (
								`${likes.length} likes`
							)
						) : (
							'0 likes'
						)}
					</Anchor>
				) : userLiked ? (
					<></>
				) : (
					<Text fz={14} mt='sm'>
						Be the first to {''}
						<Anchor
							onClick={async () => {
								const isLiked = await likePost(userId, addedBy, { postId, postImage: postImage })
								if (isLiked) {
									setUserLiked(true)
								}
							}}
							style={{ fontWeight: 700, color: dark ? 'white' : 'black' }}>
							like this
						</Anchor>
					</Text>
				)}
			</span>
		</>
	)
}

export default DetailsLikes
