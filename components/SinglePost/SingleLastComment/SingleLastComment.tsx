'use client'
import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import { useState } from 'react'
import Link from 'next/link'
import LikeCommentButton from './LikeCommentButton/LikeCommentButton'
import HighlightText from '../../HighlightText.tsx/HighlightText'
import { useElementSize } from '@mantine/hooks'

interface SingleLastCommentProps {
	username: string
	text: string
	postId: string
	commentId: string
	mentionedTags: string[]
	mentionedUsers: string[]
}
const SingleLastComment = ({
	username,
	text,
	postId,
	commentId,
	mentionedTags,
	mentionedUsers,
}: SingleLastCommentProps) => {
	const [alreadyIsLiked, setAlreadyIsLiked] = useState(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { ref: usernameRef, width: usernameWidth } = useElementSize()
	const { ref: likeRef, width: likeWidth } = useElementSize()
	return (
		<Flex direction='row' justify='space-between' align='center' sx={{ maxWidth: 450, overflowWrap: 'break-word' }}>
			<Flex direction='row' justify='flex-start' align='flex-start' gap='5px'>
				<Text
					ref={usernameRef}
					color={dark ? 'white' : 'black'}
					fz='sm'
					href={`profile/${username}`}
					fw={600}
					component={Link}>
					{username}
				</Text>

				<Text fz='sm' sx={{ overflowWrap: 'break-word', maxWidth: 450 - usernameWidth - likeWidth - 20 }}>
					<HighlightText text={text} mentionedTags={mentionedTags} mentionedUsers={mentionedUsers} />
				</Text>
			</Flex>
			<div ref={likeRef}>
				<LikeCommentButton
					postId={postId}
					commentId={commentId}
					alreadyIsLiked={alreadyIsLiked}
					setAlreadyIsLiked={setAlreadyIsLiked}
				/>
			</div>
		</Flex>
	)
}

export default SingleLastComment
