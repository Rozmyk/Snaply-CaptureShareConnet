'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { addComment } from '../../../utils/post/AddComment'
import InputWithTagsAndUserMention from '../../InputWithTagsAndUserMention/InputWithTagsAndUserMention'
import { PostProps } from '../../../types'
interface PostAddCommentProps {
	postData: PostProps
}
const PostAddComment = ({ postData }: PostAddCommentProps) => {
	const session = useSession()
	const userId = session?.data?.user?.id

	const [mentionedTags, setMentionedTags] = useState<string[]>([])
	const [mentionedUsers, setMentionedUsers] = useState<string[]>([])
	const [inputValue, setInputValue] = useState('')
	const [cleanText, setCleanText] = useState('')
	const AddCommentToPost = async () => {
		if (!userId) {
			return null
		}
		const succesfullAddComment = await addComment(userId, postData, cleanText, mentionedUsers, mentionedTags)

		if (succesfullAddComment) {
			setMentionedTags([])
			setMentionedUsers([])
			setInputValue('')
			setCleanText('')
		}
	}
	return (
		<InputWithTagsAndUserMention
			singleLine={true}
			inputValue={inputValue}
			setInputValue={setInputValue}
			setMentionedTags={setMentionedTags}
			setMentionedUsers={setMentionedUsers}
			setCleanText={setCleanText}
			onClick={AddCommentToPost}
			showButton={true}
			isRepliedInput={false}
		/>
	)
}

export default PostAddComment
