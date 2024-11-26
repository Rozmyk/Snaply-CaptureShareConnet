import { Anchor, Avatar, Flex, FileButton } from '@mantine/core'
import { SingleStoryProps } from '../../../../../types'

interface AddTitleWithIconProps {
	lastSelectedStory: SingleStoryProps | null
	file: File | null
	setFile: (payload: File | null) => void
}
const AddTitleWithIcon = ({ lastSelectedStory, file, setFile }: AddTitleWithIconProps) => {
	return (
		<Flex p='xl' direction='column' gap='sm' justify='center' align='center'>
			<Avatar
				sx={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid white' }}
				src={file ? URL.createObjectURL(file) : lastSelectedStory && lastSelectedStory.image}></Avatar>

			<FileButton onChange={setFile} accept='image/png,image/jpeg'>
				{props => (
					<Anchor {...props} color='#1a71cc' fw={500}>
						Edit background photo
					</Anchor>
				)}
			</FileButton>
		</Flex>
	)
}

export default AddTitleWithIcon
