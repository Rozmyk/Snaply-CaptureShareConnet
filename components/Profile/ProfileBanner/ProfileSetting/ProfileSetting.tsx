import { Modal, ActionIcon, Stack } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { useDisclosure } from '@mantine/hooks'
import SingleListItem from './SingleListItem/SingleListItem'
const ProfileSetting = () => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal.Root centered opened={opened} onClose={close} radius='lg'>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Body sx={{ margin: 0, padding: 0 }}>
						<Stack spacing={0}>
							<SingleListItem disabled centerText='change password' />
							<SingleListItem disabled centerText='QR Code' />
							<SingleListItem disabled centerText='app and websites' />
							<SingleListItem disabled centerText='notifications' />
							<SingleListItem disabled centerText='settings and privacy' />

							<SingleListItem centerText='logout' onClick={signOut} />
							<SingleListItem onClick={close} centerText='cancel' isLastItem={true} />
						</Stack>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<ActionIcon onClick={open}>
				<IconSettings></IconSettings>
			</ActionIcon>
		</>
	)
}

export default ProfileSetting
