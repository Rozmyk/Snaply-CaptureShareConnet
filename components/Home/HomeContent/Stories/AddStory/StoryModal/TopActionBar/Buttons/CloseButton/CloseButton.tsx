import { ActionIcon } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
interface CloseButtonProps {
	closeModal: () => void
}
const CloseButton = ({ closeModal }: CloseButtonProps) => {
	return (
		<ActionIcon
			onClick={closeModal}
			size='lg'
			style={{ backgroundColor: 'rgba(0,0,0,0.5' }}
			radius='50%'
			variant='filled'>
			<IconX size='20px' />
		</ActionIcon>
	)
}

export default CloseButton
