import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'
import { savePost } from '../../../../../utils/post/savePost'
import { unsavePost } from '../../../../../utils/post/unsavePost'
import { Dispatch, SetStateAction } from 'react'

interface SaveButtonProps {
	isSaved: boolean
	userId: string
	postId: string
	setIsSaved: Dispatch<SetStateAction<boolean>>
}
const SaveButton = ({ isSaved, userId, postId, setIsSaved }: SaveButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const handleSaveClick = async () => {
		if (isSaved) {
			const isUnsaved = await unsavePost(userId, postId)
			if (isUnsaved) setIsSaved(false)
		} else {
			const isSaved = await savePost(userId, postId)
			if (isSaved) setIsSaved(true)
		}
	}

	return (
		<Tooltip label={isSaved ? 'Delete' : 'Save'} position='bottom-end'>
			<ActionIcon onClick={handleSaveClick}>
				{isSaved ? (
					<IconBookmarkFilled style={{ color: dark ? 'white' : 'black' }} />
				) : (
					<IconBookmark style={{ color: dark ? 'white' : 'black' }} />
				)}
			</ActionIcon>
		</Tooltip>
	)
}

export default SaveButton
