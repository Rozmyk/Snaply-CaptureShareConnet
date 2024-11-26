import { Flex, Text, Modal, Anchor, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ModalHeader from '../../../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import ModalContent from './ModalContent/ModalContent'
import { ReactNode } from 'react'
interface FollowingProps {
	children: ReactNode
	followingData: string[]
}
const Following = ({ followingData, children }: FollowingProps) => {
	const [opened, { open, close }] = useDisclosure(false)

	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<>
			<Modal.Root centered radius='md' opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content>
					<ModalHeader centerText='Following' closeButton closeButtonAction={close} />
					<Modal.Body sx={{ height: '400px', overflow: 'hidden' }}>
						<ModalContent followingData={followingData} />
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<div onClick={open}>{children}</div>
		</>
	)
}

export default Following
