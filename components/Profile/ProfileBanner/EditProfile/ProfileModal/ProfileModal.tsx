import { Modal, Flex, useMantineColorScheme, ScrollArea } from '@mantine/core'
import ModalHeader from '../../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import ChangePhoto from './ChangePhoto/ChangePhoto'
import NameInput from './NameInput/NameInput'
import BioInput from './BioInput/BioInput'
import SubmitButton from './SubmitButton/SubmitButton'
import WebsiteInput from './WebsiteInput/WebsiteInput'
import { Dispatch, SetStateAction } from 'react'
interface ProfileModalProps {
	opened: boolean
	closeModal: () => void
	bioValue: string
	setBioValue: Dispatch<SetStateAction<string>>
	websiteValue: string
	setWebsiteValue: Dispatch<SetStateAction<string>>
	websiteValueError: boolean
	setWebsiteValueError: Dispatch<SetStateAction<boolean>>
	checkWebsite: (website: string) => boolean
	temporaryPhoto: File | null
	setTemporaryPhoto: Dispatch<SetStateAction<File | null>>
	loading: boolean
	setUpChanges: () => void
	nameValue: string
	setNameValue: Dispatch<SetStateAction<string>>
}
const ProfileModal = ({
	opened,
	closeModal,
	bioValue,
	setBioValue,
	websiteValue,
	setWebsiteValue,
	websiteValueError,
	setWebsiteValueError,
	checkWebsite,
	temporaryPhoto,
	setTemporaryPhoto,
	loading,
	setUpChanges,
	nameValue,
	setNameValue,
}: ProfileModalProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Modal.Root radius='lg' centered opened={opened} onClose={closeModal}>
			<Modal.Overlay />
			<Modal.Content sx={{ backgroundColor: dark ? '#000101' : '#fefffe' }}>
				<ModalHeader centerText='Edit profile' closeButton closeButtonAction={closeModal} />
				<Modal.Body>
					<ScrollArea.Autosize mah={400} offsetScrollbars>
						<ChangePhoto temporaryPhoto={temporaryPhoto} setTemporaryPhoto={setTemporaryPhoto} />
						<WebsiteInput
							dark={dark}
							websiteValue={websiteValue}
							setWebsiteValue={setWebsiteValue}
							websiteValueError={websiteValueError}
							setWebsiteValueError={setWebsiteValueError}
							checkWebsite={checkWebsite}
						/>
						<NameInput dark={dark} nameValue={nameValue} setNameValue={setNameValue} />
						<BioInput dark={dark} bioValue={bioValue} setBioValue={setBioValue} />
						<Flex justify='flex-end'>
							<SubmitButton loading={loading} setUpChanges={setUpChanges} />
						</Flex>
					</ScrollArea.Autosize>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}

export default ProfileModal
