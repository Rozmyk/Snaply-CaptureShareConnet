import { Flex, ActionIcon, Text, Box, CloseButton, useMantineColorScheme } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import CustomButtonTransparent from '../../../../CustomButton/CustomButtonTransparent/CustomButtonTransparent'

interface ModalHeaderProps {
	buttonText?: string
	closeButton?: boolean
	centerText: string
	onActionIconClick?: () => void
	onButtonClick?: () => void | undefined
	closeButtonAction?: () => void
}

const ModalHeader = ({
	buttonText,
	centerText,
	closeButton,
	onActionIconClick,
	onButtonClick,
	closeButtonAction,
}: ModalHeaderProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex
			justify='space-between'
			align='center'
			pl='7px'
			pr='7px'
			pb='10px'
			pt='10px'
			sx={{ borderBottom: `1px solid ${dark ? '#363636' : '#dbdbdb'} `, width: '100%' }}>
			<Box>
				{onActionIconClick && (
					<ActionIcon onClick={onActionIconClick}>
						<IconChevronLeft color={dark ? '#f5f5f5' : 'black'} />
					</ActionIcon>
				)}
			</Box>
			<Text color={dark ? '#f5f5f5' : 'black'} fz={16} fw={700}>
				{centerText}
			</Text>

			<Box>
				{buttonText && onButtonClick && <CustomButtonTransparent onClick={onButtonClick}>{buttonText}</CustomButtonTransparent>}{' '}
				{closeButton && (
					<CloseButton sx={{ color: dark ? '#f5f5f5' : 'black' }} onClick={closeButtonAction} size='md'></CloseButton>
				)}
			</Box>
		</Flex>
	)
}

export default ModalHeader
