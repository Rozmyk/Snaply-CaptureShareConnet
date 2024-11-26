import { Dispatch, SetStateAction, useEffect } from 'react'
import { Flex, Button, useMantineColorScheme } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'

import EmoijSelector from '../EmoijSelector/EmoijSelector'
import useFetchTags from './useFetchTags'
import useFetchUsers from './useFetchUsers'
import InputMention from './InputMention/InputMention'
import { ReplyToPost } from '../../types'
interface InputWithTagsAndUserMentionProps {
	singleLine: boolean
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	setMentionedUsers: Dispatch<SetStateAction<string[]>>
	setMentionedTags: Dispatch<SetStateAction<string[]>>
	setCleanText: Dispatch<SetStateAction<string>>
	onClick?: () => void
	showButton: boolean
	replyData?: ReplyToPost
	setReplyData?: Dispatch<SetStateAction<ReplyToPost>>
	maxWidth?: number
	maxHeight?: number
	isRepliedInput: boolean
}

const InputWithTagsAndUserMention = ({
	singleLine,
	inputValue,
	setInputValue,
	setMentionedTags,
	setMentionedUsers,
	setCleanText,
	onClick,
	showButton,
	replyData,
	setReplyData,
	maxHeight,
	maxWidth,
	isRepliedInput,
}: InputWithTagsAndUserMentionProps) => {
	const { ref: inputRef, width: inputWidth } = useElementSize()

	const { tags, tagLoading } = useFetchTags()
	const { users, userLoading } = useFetchUsers()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	useEffect(() => {
		if (isRepliedInput && replyData && replyData.isReplied) {
			setInputValue(prevValue => `@${replyData.replyUsername} ${prevValue}`)
			setMentionedUsers(prevArray => [...prevArray, replyData.replyUserId])
		}
	}, [replyData, isRepliedInput, setInputValue, setMentionedUsers])

	const handleChange = (_: any, newValue: string, newPlainTextValue: string) => {
		setInputValue(newValue)
		if (newValue === '') {
			{
				isRepliedInput &&
					setReplyData &&
					setReplyData({
						isReplied: false,
						replyUserId: '',
						replyUsername: '',
						postId: '',
						commentId: '',
					})
			}
			setMentionedTags([])
			setMentionedUsers([])
		}
		const hashtags: string[] | null = newPlainTextValue.match(/#(\w+)/g)
		if (hashtags) {
			setMentionedTags(hashtags)
		}

		setCleanText(newPlainTextValue)
	}
	const handleEmojiChange = (value: any) => {
		setInputValue(value)
		setCleanText(value)
	}

	return (
		<Flex justify='space-between' align='center' maw={maxWidth} w='100%'>
			<Flex ref={inputRef} sx={{ flexGrow: 1 }}>
				{!tagLoading && !userLoading && (
					<InputMention
						singleLine={singleLine}
						inputValue={inputValue}
						setMentionedTags={setMentionedTags}
						setMentionedUsers={setMentionedUsers}
						users={users}
						inputWidth={inputWidth}
						maxHeight={maxHeight}
						tags={tags}
						dark={dark}
						handleChange={handleChange}
					/>
				)}
			</Flex>
			<Flex justify='center' align='center'>
				{inputValue && inputValue.trim() !== '' && showButton && (
					<Button compact onClick={onClick} type='submit' variant='subtle'>
						Post
					</Button>
				)}
				<EmoijSelector setInputValue={handleEmojiChange} iconSize='xs' iconColor={dark ? 'white' : 'black'} />
			</Flex>
		</Flex>
	)
}

export default InputWithTagsAndUserMention
