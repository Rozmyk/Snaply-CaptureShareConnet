'use client'
import { useState } from 'react'
import { Modal } from '@mantine/core'
import ModalHeader from '../../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import SetHighlightName from '../SetHighlightName/SetHighlightName'
import StoriesContainer from '../StoriesContainer/StoriesContainer'
import AddTitleWithIcon from '../AddTitleWithIcon/AddTitleWithIcon'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '@/app/firebase'
import { useSession } from 'next-auth/react'
import { SingleStoryProps } from '../../../../../types'
interface ModalContentProps {
	opened: boolean
	close: () => void
}
const ModalContent = ({ opened, close }: ModalContentProps) => {
	const [currentStep, setCurrentStep] = useState<'setName' | 'selectStories' | 'setTitleIcon'>('setName')
	const [inputValue, setInputValue] = useState<string>('')
	const [selectedStories, setSelectedStories] = useState<string[]>([])
	const [lastSelectedStory, setLastSelectedStory] = useState<SingleStoryProps | null>(null)

	const [file, setFile] = useState<File | null>(null)
	const session = useSession()
	const userId = session?.data?.user?.id
	const closeModal = () => {
		close()
		setInputValue('')
		setCurrentStep('setName')
		setSelectedStories([])
		setLastSelectedStory(null)
		setFile(null)
	}
	const uploadPhoto = async (fileToUpload: File) => {
		const imageId = uuidv4()
		if (file) {
			try {
				const imageRef = ref(storage, `highlight/${userId}/${imageId}`)
				const snapshot = await uploadBytes(imageRef, fileToUpload)

				const url = await getDownloadURL(snapshot.ref)

				return url
			} catch (err) {
				console.log(err)
			}
		}
	}
	const addHighlight = async () => {
		try {
			if (lastSelectedStory) {
				const newHighlight = {
					addedBy: userId,
					highlightGroupName: inputValue,
					highlightGroupImage: file ? await uploadPhoto(file) : lastSelectedStory.image,
					storyIds: selectedStories,
					createdAt: new Date(),
				}

				const highlightsRef = collection(db, 'highlights')
				const newHighlightRef = await addDoc(highlightsRef, newHighlight)

				closeModal()
			}
		} catch (err) {
			console.error('Błąd podczas dodawania podświetlenia:', err)
		}
	}
	const renderCurrentModal = () => {
		switch (currentStep) {
			case 'setName':
				return <ModalHeader centerText={'New Highlight'} closeButton closeButtonAction={closeModal} />
			case 'selectStories':
				return (
					<ModalHeader
						centerText='Stories'
						onActionIconClick={() => {
							setCurrentStep('setName')
						}}
						closeButton
						closeButtonAction={closeModal}
					/>
				)
			case 'setTitleIcon':
				return (
					<ModalHeader
						onActionIconClick={() => {
							setCurrentStep('selectStories')
						}}
						centerText={'Edit Highlight'}
						buttonText='Done'
						onButtonClick={() => {
							addHighlight()
						}}
					/>
				)
			default:
				return null
		}
	}
	const renderCurrentStep = () => {
		switch (currentStep) {
			case 'setName':
				return (
					<SetHighlightName inputValue={inputValue} setInputValue={setInputValue} setCurrentStep={setCurrentStep} />
				)
			case 'selectStories':
				return (
					<StoriesContainer
						selectedStories={selectedStories}
						setSelectedStories={setSelectedStories}
						setLastSelectedStory={setLastSelectedStory}
						setCurrentStep={setCurrentStep}
					/>
				)
			case 'setTitleIcon':
				return <AddTitleWithIcon lastSelectedStory={lastSelectedStory} file={file} setFile={setFile} />
			default:
				return null
		}
	}
	return (
		<Modal.Root radius='lg' centered opened={opened} onClose={closeModal}>
			<Modal.Overlay />
			<Modal.Content>
				{renderCurrentModal()}
				<Modal.Body p={0}> {renderCurrentStep()}</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}

export default ModalContent
