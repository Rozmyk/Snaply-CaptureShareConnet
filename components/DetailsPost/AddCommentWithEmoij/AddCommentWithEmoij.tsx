import React, { useState, useEffect } from 'react'
import { IconMoodSmile } from '@tabler/icons-react'
import { Flex, ActionIcon, Popover, useMantineColorScheme } from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { getAllUsers } from '../../../utils/getAllUsers'
import { addComment } from '../../../utils/post/AddComment'
import { useSession } from 'next-auth/react'
import CustomButtonTransparent from '../../CustomButton/CustomButtonTransparent/CustomButtonTransparent'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { addRepliesToComment } from '../../../utils/post/addRepliesToComment'
import { sendNotification } from '../../../utils/user/sendNotification'
import { useElementSize } from '@mantine/hooks'
import { Dispatch, SetStateAction } from 'react'

import { PostProps, ReplyToCommentProps, DownloadTagProps } from '../../../types'
import InputMention from '../../InputWithTagsAndUserMention/InputMention/InputMention'
interface AddCommentWithEmoijProps {
	postData: PostProps
	replyData: ReplyToCommentProps | null
	setReplyData: Dispatch<SetStateAction<ReplyToCommentProps | null>>
	maxWidth: number
}
interface customUserProps {
	id: string
	image: string
	name: string
	display: string
}

const AddCommentWithEmoij = ({ postData, replyData, setReplyData, maxWidth }: AddCommentWithEmoijProps) => {
	const [users, setUsers] = useState<customUserProps[] | null>(null)
	const [tags, setTags] = useState<DownloadTagProps[]>([])
	const [value, setValue] = useState<string>('')
	const [cleanText, setCleanText] = useState<string>('')
	const [mentionedUsers, setMentionedUsers] = useState<string[]>([])
	const [mentionedTags, setMentionedTags] = useState<string[]>([])
	const { ref, width } = useElementSize()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const session = useSession()
	const userId = session.data?.user?.id
	useEffect(() => {
		if (replyData && replyData.replyUsername) {
			const valueToAdd = '@' + replyData.replyUsername + ' '
			if (!value.startsWith(valueToAdd)) {
				setValue(valueToAdd + value)
				setMentionedUsers(prevArray =>
					prevArray ? [...prevArray, replyData.replyUserId as string] : [replyData.replyUserId as string]
				)
			}
		}
	}, [replyData, value])
	useEffect(() => {
		if (value == '') {
			setMentionedUsers([])
			setMentionedTags([])
		}
	}, [value])
	const handleSubmit = async () => {
		{
			replyData ? await handleAddReply() : await handleAddComment()
		}

		setValue('')
		setCleanText('')
		setMentionedUsers([])
		setMentionedTags([])
		setReplyData(null)
	}
	const handleAddComment = async () => {
		try {
			try {
				if (userId) {
					await addComment(userId, postData, cleanText, mentionedUsers, mentionedTags)
				}
			} catch (err) {
				console.log(err)
			}
			if (mentionedUsers) {
				for (const user of mentionedUsers) {
					try {
						if (userId) {
							await sendNotification(userId, user, 'mentionedInComment', {
								post: {
									postId: postData.id,
									postImage: postData.image,
								},
								content: cleanText,
							})
						}
					} catch (error) {
						console.error(`Failed to send notification to user ${user}`, error)
					}
				}
			}
		} catch (error) {
			console.error('Failed to add comment', error)
		}
	}
	const handleAddReply = async () => {
		try {
			replyData &&
				userId &&
				(await addRepliesToComment(userId, postData, replyData.commentId, cleanText, mentionedUsers, mentionedTags))
			if (mentionedUsers) {
				for (const user of mentionedUsers) {
					try {
						if (userId) {
							await sendNotification(userId, user, 'mentionedInComment', {
								post: {
									postId: postData.id,
									postImage: postData.image,
								},
								content: cleanText,
							})
						}
					} catch (error) {
						console.error(`Failed to send notification to user ${user}`, error)
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = (event: any, newValue: string, newPlainTextValue: string) => {
		if (event.key === 'Enter') {
			handleSubmit()
		}

		setValue(newValue)

		const hashtags = newPlainTextValue.match(/#(\w+)/g)
		if (hashtags) {
			setMentionedTags(hashtags)
		}

		setCleanText(newPlainTextValue)
	}

	const fetchMentionedTags = async (): Promise<void> => {
		try {
			const postsCollection = collection(db, 'posts')
			const querySnapshot = await getDocs(postsCollection)

			const tagCounts: any = {}

			querySnapshot.forEach(doc => {
				const data = doc.data() as PostProps
				if (data.mentionedTags && Array.isArray(data.mentionedTags)) {
					data.mentionedTags.forEach(tag => {
						tagCounts[tag] = (tagCounts[tag] || 0) + 1
					})
				}
			})

			const allMentionedTags: any = Object.entries(tagCounts).map(([tag, count]) => ({
				display: tag,
				postLength: count,
				id: uuidv4(),
			}))

			if (allMentionedTags) {
				setTags(allMentionedTags)
			}
		} catch (error) {
			console.error('Error fetching mentionedTags: ', error)
			throw error
		}
	}
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const allUsers = await getAllUsers()
				const usersData = allUsers.map(user => ({
					id: user.id,
					image: user.image,
					name: user.name,
					display: user.username,
				}))

				if (usersData) {
					setUsers(usersData)
				}
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		}

		fetchUsers()
	}, [])
	useEffect(() => {
		fetchMentionedTags()
	}, [])

	return (
		<Flex direction='column' mt='sm' style={{ flexGrow: 1, width: '100%', maxWidth: maxWidth }}>
			<Flex gap='xs' align='center'>
				<Popover trapFocus position='top-start' withArrow arrowPosition='side'>
					<Popover.Target>
						<ActionIcon>
							<IconMoodSmile />
						</ActionIcon>
					</Popover.Target>
					<Popover.Dropdown p='0'>
						<Picker
							data={data}
							onEmojiSelect={(emoji: any) => {
								setValue(prevValue => prevValue + emoji.native)
								setCleanText(prevCleanText => prevCleanText + emoji.native)
							}}
						/>
					</Popover.Dropdown>
				</Popover>
				<Flex ref={ref} style={{ flexGrow: 1 }}>
					{users && (
						<InputMention
							singleLine={true}
							inputWidth={width}
							handleChange={handleChange}
							tags={tags}
							users={users}
							inputValue={value}
							dark={dark}
							setMentionedTags={setMentionedTags}
							setMentionedUsers={setMentionedUsers}
						/>
					)}
				</Flex>
				<Flex>
					<CustomButtonTransparent disabled={!value || value.trim() == ''} onClick={handleSubmit} fullWidth={false}>
						Post
					</CustomButtonTransparent>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default AddCommentWithEmoij
