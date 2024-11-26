import { useDisclosure } from '@mantine/hooks'
import { Modal, Box, Image, CloseButton } from '@mantine/core'
interface MessageTypePhotoProps {
	src: string
}
function MessageTypePhoto({ src }: MessageTypePhotoProps) {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal.Root radius='md' size='auto' opened={opened} centered onClose={close}>
				<Modal.Overlay>
					<Box m='sm' sx={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
						<CloseButton onClick={close} size='xl' />
					</Box>
				</Modal.Overlay>

				<Modal.Content>
					<Modal.Body sx={{ margin: 0, padding: 0, overflow: 'hidden' }}>
						<Image maw={'80vw'} src={src} alt=''></Image>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>
			<div style={{ borderRadius: '15px', overflow: 'hidden' }}>
				<Image onClick={open} alt='xd' src={src} width={150} height={265}></Image>
			</div>
		</>
	)
}
export default MessageTypePhoto
