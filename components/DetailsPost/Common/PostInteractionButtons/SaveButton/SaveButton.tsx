import { Tooltip, ActionIcon } from '@mantine/core'
import { IconBookmarkFilled, IconBookmark } from '@tabler/icons-react'
import { savePost } from '../../../../../utils/post/savePost'
import { unsavePost } from '../../../../../utils/post/unsavePost'
import { Dispatch, SetStateAction } from 'react'
interface SaveButtonProps {
	isSaved: boolean
	setIsSaved: Dispatch<SetStateAction<boolean>>
	dark: boolean
	userId: string
	postId: string
}
const SaveButton = ({ isSaved, setIsSaved, dark, userId, postId }: SaveButtonProps) => {
	return isSaved ? (
		<Tooltip label='Delete' position='bottom-end'>
			<ActionIcon
				size='lg'
				onClick={async () => {
					const isUnsaved = await unsavePost(userId, postId)
					if (isUnsaved) {
						setIsSaved(false)
					}
				}}>
				<IconBookmarkFilled color={dark ? '#f5f5f5' : 'black'} />
			</ActionIcon>
		</Tooltip>
	) : (
		<Tooltip label='Save' position='bottom-end'>
			<ActionIcon
				size='lg'
				onClick={async () => {
					const isSaved = await savePost(userId, postId)
					if (isSaved) {
						setIsSaved(true)
					}
				}}>
				<IconBookmark color={dark ? '#f5f5f5' : 'black'}></IconBookmark>
			</ActionIcon>
		</Tooltip>
	)
}

export default SaveButton
