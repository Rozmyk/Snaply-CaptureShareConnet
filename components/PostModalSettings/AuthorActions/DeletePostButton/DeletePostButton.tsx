import { Modal, Flex, Text, UnstyledButton } from '@mantine/core'
import RegularButton from '../../RegularButton/RegularButton'
import { useDisclosure } from '@mantine/hooks'
interface DeletePostButtonProps {
	onClick: () => void
	dark: boolean
}
const DeletePostButton = ({ onClick, dark }: DeletePostButtonProps) => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal radius='lg' opened={opened} zIndex={1000000} withCloseButton={false} centered onClose={close}>
				<Flex direction='column' justify='center' align='center' gap='sm'>
					<Text color={dark ? '#f5f5f5' : 'black'} fw={400} fz='20px' sx={{ borderWidth: '1px' }}>
						Delete post?
					</Text>
					<Text color={dark ? '#737373' : '#a8a8a8'} fz='sm'>
						Are you sure you want to delete this post?
					</Text>
					<Flex direction='column' align='center' w='100%'>
						<UnstyledButton
							onClick={onClick}
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
							Delete
						</UnstyledButton>
						<UnstyledButton
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
							}}
							onClick={() => {
								close()
							}}>
							Cancel
						</UnstyledButton>
					</Flex>
				</Flex>
			</Modal>
			<RegularButton isFirstButton onClick={open} errorVariant>
				Delete
			</RegularButton>
		</>
	)
}

export default DeletePostButton
