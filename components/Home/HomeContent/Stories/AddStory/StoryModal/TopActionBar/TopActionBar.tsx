import { Flex } from '@mantine/core'
import CloseButton from './Buttons/CloseButton/CloseButton'

interface TopActionBarProps {
	closeModal: () => void
}
const TopActionBar = ({ closeModal }: TopActionBarProps) => {
	return (
		<Flex
			sx={{ position: 'absolute', top: 0, right: 0, left: 0 }}
			justify='space-between'
			align='center'
			p='sm'
			w='100%'>
			<CloseButton closeModal={closeModal} />
		</Flex>
	)
}

export default TopActionBar
