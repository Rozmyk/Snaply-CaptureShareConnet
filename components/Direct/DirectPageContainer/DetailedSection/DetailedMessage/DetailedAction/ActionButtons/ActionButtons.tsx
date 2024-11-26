import { ActionIcon, Anchor, Flex, Tooltip } from '@mantine/core'
import { IconMicrophone, IconHeart } from '@tabler/icons-react'
import SendPhoto from '../../../../../../DetailsPost/SendPhoto/SendPhoto'
import { SetStateAction, Dispatch } from 'react'
interface ActionButtonsProps {
	dark: boolean
	inputValue: string
	file: File | null
	handleButtonClick: () => void
	sendLike: () => void
	setPhotoUrl: Dispatch<SetStateAction<string>>
	setFile: Dispatch<SetStateAction<File | null>>
}
const ActionButtons = ({
	dark,
	inputValue,
	file,
	handleButtonClick,
	sendLike,
	setPhotoUrl,
	setFile,
}: ActionButtonsProps) =>
	inputValue.trim() !== '' || file !== null ? (
		<Anchor onClick={handleButtonClick} type='button'>
			Send
		</Anchor>
	) : (
		<Flex justify='space-between' gap='sm' align='center'>
			<Tooltip label='The option is currently unavailable.'>
				<ActionIcon>
					<IconMicrophone style={{ color: dark ? 'white' : 'black' }} />
				</ActionIcon>
			</Tooltip>
			<SendPhoto setPhotoUrl={setPhotoUrl} setFile={setFile} />
			<ActionIcon onClick={sendLike}>
				<IconHeart style={{ color: dark ? 'white' : 'black' }} />
			</ActionIcon>
		</Flex>
	)

export default ActionButtons
