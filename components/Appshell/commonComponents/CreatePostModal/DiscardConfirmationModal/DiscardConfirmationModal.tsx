'use client'
import { Text, Flex, Modal, useMantineColorScheme, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Dispatch, SetStateAction, useEffect } from 'react'
interface DiscardConfirmationModalProps {
	modalStatus: boolean
	setModalStatus: Dispatch<SetStateAction<boolean>>
	hideModal: () => void
}
const DiscardConfirmationModal = ({ modalStatus, setModalStatus, hideModal }: DiscardConfirmationModalProps) => {
	const [opened, { open, close }] = useDisclosure(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const handleDiscard = () => {
		hideModal()
		setModalStatus(false)
	}
	const handleClose = () => {
		close()
	}
	useEffect(() => {
		if (modalStatus) {
			open()
		} else {
			close()
		}
	}, [modalStatus, open, close])

	return (
		<>
			<Modal
				radius='lg'
				sx={{ maxWidth: 400 }}
				opened={opened}
				centered
				onClose={() => {
					setModalStatus(false)
				}}
				withCloseButton={false}
				zIndex={1000}>
				<Flex direction='column' justify='center' align='center' gap='sm'>
					<Text color={dark ? '#f5f5f5' : 'black'} fw={400} fz='20px' sx={{ borderWidth: '1px' }}>
						Discard post?
					</Text>
					<Text fz='sm'>If you leave, your edits won&apos;t be saved.</Text>

					<Flex direction='column' align='center' w='100%'>
						<UnstyledButton
							onClick={handleDiscard}
							sx={{
								color: '#ed4956',
								fontWeight: 700,
								backgroundColor: 'transparent',
								borderTop: dark ? '1px solid #363636' : '1px solid #DBDBDB',
								width: '100%',
								padding: '10px 20px',
								textAlign: 'center',
								display: 'inline-block',
								fontSize: '16px',
								cursor: 'pointer',
								margin: '4px 2px',
							}}>
							Discard
						</UnstyledButton>
						<UnstyledButton
							onClick={handleClose}
							sx={{
								color: dark ? 'white' : 'black',
								fontWeight: 400,
								backgroundColor: 'transparent',
								borderTop: dark ? '1px solid #363636' : '1px solid #DBDBDB',
								width: '100%',
								padding: '10px 20px',
								textAlign: 'center',
								display: 'inline-block',
								fontSize: '16px',
								cursor: 'pointer',
								margin: '4px 2px',
							}}>
							Cancel
						</UnstyledButton>
					</Flex>
				</Flex>
			</Modal>
		</>
	)
}

export default DiscardConfirmationModal
