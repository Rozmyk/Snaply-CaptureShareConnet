import { showComments, hideComments } from '../../../../utils/post/toggleShowComments'
import { useState } from 'react'
import { Loader } from '@mantine/core'
import RegularButton from '../../RegularButton/RegularButton'
interface ToggleCommentProps {
	turnOffComments: boolean
	postId: string
}

const ToggleComment = ({ turnOffComments, postId }: ToggleCommentProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hiddenComments, setHiddenComments] = useState(turnOffComments)

	const handleToggleClick = async () => {
		setIsLoading(true)
		if (hiddenComments) {
			const isVisible = await showComments(postId)
			if (isVisible) {
				setHiddenComments(false)
			}
		} else {
			const isHidden = await hideComments(postId)
			if (isHidden) {
				setHiddenComments(true)
			}
		}
		setIsLoading(false)
	}

	return (
		<RegularButton onClick={handleToggleClick}>
			{isLoading ? <Loader color='gray' size='sm' /> : hiddenComments ? 'Show comments' : 'Hide comments'}
		</RegularButton>
	)
}

export default ToggleComment
