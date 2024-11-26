import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ModalHeader from '../../../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import ModalContent from './ModalContent/ModalContent'
import { ReactNode } from 'react'
interface FollowersProps {
	followersData: string[]
	children: ReactNode
}
const Followers = ({ followersData, children }: FollowersProps) => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal.Root centered radius='md' opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content>
					<ModalHeader centerText='Followers' closeButton closeButtonAction={close} />
					<Modal.Body sx={{ height: '400px', overflow: 'hidden' }}>
						<ModalContent followersData={followersData} />
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<div onClick={open}>{children}</div>
		</>
	)
}

export default Followers
