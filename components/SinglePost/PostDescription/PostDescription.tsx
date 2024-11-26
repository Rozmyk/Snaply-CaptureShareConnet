'use client'
import { useEffect, useState } from 'react'
import { Flex, Text, useMantineColorScheme, Anchor } from '@mantine/core'
import Link from 'next/link'
import ShowUserDetails from '../../ShowUserDetails/ShowUserDetails'
import HighlightText from '../../HighlightText.tsx/HighlightText'

import { useElementSize } from '@mantine/hooks'
interface PostDescriptionProps {
	username: string
	text: string
	addedBy: string
	mentionedUsers: string[]
	mentionedTags: string[]
}
const PostDescription = ({ username, text, addedBy, mentionedUsers, mentionedTags }: PostDescriptionProps) => {
	const [showFullText, setShowFullText] = useState(false)
	const maxLetterLength = 125
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const trimmedString = text.length > maxLetterLength ? text.slice(0, maxLetterLength) + '...' : text
	const { ref: containerRef, width: containerWidth } = useElementSize()
	const { ref: textRef, width: textWidth } = useElementSize()

	useEffect(() => {
		if (text.trim().length > maxLetterLength) {
			setShowFullText(false)
		}
	}, [text])

	return (
		<Flex
			ref={containerRef}
			direction='row'
			justify='flex-start'
			align='flex-start'
			gap='5px'
			sx={{ maxWidth: '450px', overflowWrap: 'break-word' }}>
			<div ref={textRef}>
				<ShowUserDetails userDetailsId={addedBy}>
					<Text
						fz='sm'
						p={0}
						m={0}
						color={dark ? 'white' : 'black'}
						fw={600}
						component={Link}
						href={`/profile/${username}`}>
						{username}
					</Text>
				</ShowUserDetails>
			</div>
			<Text fz='sm' p={0} m={0} sx={{ maxWidth: containerWidth - textWidth - 15 }}>
				<HighlightText
					text={showFullText ? text : trimmedString}
					mentionedTags={mentionedTags}
					mentionedUsers={mentionedUsers}
				/>

				{text.trim().length > maxLetterLength && (
					<>
						<Anchor
							size='sm'
							type='button'
							style={{ color: dark ? '#a8a8a8' : '#737373' }}
							onClick={() => setShowFullText(prev => !prev)}>
							{showFullText ? null : 'Show More'}
						</Anchor>
					</>
				)}
			</Text>
		</Flex>
	)
}

export default PostDescription
