import { useState } from 'react'
import { Loader } from '@mantine/core'
import RegularButton from '../../RegularButton/RegularButton'
import { showLikeCount, hideLikeCount } from '../../../../utils/post/hideLikeCount'
interface ToggleLikeCountProps {
	hideLikes: boolean
	postId: string
}

const ToggleLikeCount = ({ hideLikes, postId }: ToggleLikeCountProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hiddenLikes, setHiddenLikes] = useState(hideLikes)

	const handleToggleClick = async () => {
		setIsLoading(true)
		if (hiddenLikes) {
			const isVisible = await showLikeCount(postId)
			if (isVisible) {
				setHiddenLikes(false)
			}
		} else {
			const isHidden = await hideLikeCount(postId)
			if (isHidden) {
				setHiddenLikes(true)
			}
		}
		setIsLoading(false)
	}

	return (
		<RegularButton onClick={handleToggleClick}>
			{isLoading ? <Loader color='gray' size='sm' /> : hiddenLikes ? 'Show like count' : 'Hide like count'}
		</RegularButton>
	)
}

export default ToggleLikeCount
