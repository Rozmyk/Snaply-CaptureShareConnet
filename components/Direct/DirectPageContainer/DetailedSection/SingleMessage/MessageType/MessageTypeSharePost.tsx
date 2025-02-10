import { Box, Flex, Text, Avatar, Image, Skeleton, useMantineColorScheme } from '@mantine/core'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getPostData } from '../../../../../../utils/getPostData'
import { fetchUserData } from '../../../../../../utils/user/fetchUserData'
import { UserProps, PostProps } from '../../../../../../types'
interface MessageTypeSharePostProps {
	postInfo: {
		sender: string
		postId: string
	}
}
const MessageTypeSharePost = ({ postInfo }: MessageTypeSharePostProps) => {
	const router = useRouter()
	const [addedByData, setAddedByData] = useState<UserProps | null>(null)
	const [postData, setPostData] = useState<PostProps | null>(null)
	const [postDataError, setPostDataError] = useState(false)
	const [postDataLoading, setPostDataLoading] = useState(true)
	const [userDataLoading, setUserDataLoading] = useState(true)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		const getUserData = async () => {
			const fetchedData: UserProps | undefined = await fetchUserData(postInfo.sender)
			if (fetchedData) {
				setAddedByData(fetchedData)
				setUserDataLoading(false)
			}
		}
		getUserData()
	}, [postInfo.sender])
	useEffect(() => {
		const fetchPostData = async () => {
			const fetchedData: PostProps | null = await getPostData(postInfo.postId)

			if (fetchedData) {
				setPostData(fetchedData)
				setPostDataLoading(false)
			} else {
				setPostDataError(true)
			}
		}
		fetchPostData()
	}, [postInfo.postId])
	return postDataLoading && userDataLoading ? (
		<Skeleton radius={20} w={300} h={400}></Skeleton>
	) : postDataError ? (
		<Box p='sm' sx={{ backgroundColor: dark ? '#272726' : '#eeefee', borderRadius: '20px' }}>
			<Text fw={600} fz='sm'>
				Message not available
			</Text>
		</Box>
	) : (
		addedByData &&
		postData && (
			<Box
				onClick={() => {
					router.push(`/post/${postInfo.postId}`)
				}}
				w={300}
				mih={430}
				sx={{ backgroundColor: dark ? '#272726' : '#eeefee', borderRadius: '20px', cursor: 'pointer' }}>
				<Flex justify='flex-start' align='center' p='sm' gap='sm'>
					<Avatar size={32} src={addedByData.image} radius='50%'></Avatar>
					<Text fw={600} fz='sm' color={dark ? 'white' : 'black'}>
						{addedByData.username}
					</Text>
				</Flex>
				<Image height={300} width={300} src={postData.image} alt=''></Image>

				<Box p='sm'>
					<Text color={dark ? 'white' : 'black'} fz='xs' fw={600} sx={{ overflowWrap: 'break-word' }}>
						{postData.caption}
					</Text>
				</Box>
			</Box>
		)
	)
}

export default MessageTypeSharePost
