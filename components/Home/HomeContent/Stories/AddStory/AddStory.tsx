'use client'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import { Modal } from '@mantine/core'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '@/app/firebase'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import StoryModal from './StoryModal/StoryModal'
import LoggedInUserStory from '../LoggedInUserStory/LoggedInUserStory'

const AddStory = () => {
	const [file, setFile] = useState<File | null>(null)
	const [fileUrl, setFileUrl] = useState<string>('')
	const [isImageUploading, setIsImageUploading] = useState(false)
	const [opened, { open, close }] = useDisclosure(false)
	const session = useSession()
	const userId = session?.data?.user?.id

	const uploadFile = async (file: File | null) => {
		if (!file) {
			return null
		}

		try {
			const imageId = uuidv4()
			const imageRef = ref(storage, `stories/${imageId}.png`)

			const snapshot = await uploadBytes(imageRef, file)
			const url = await getDownloadURL(snapshot.ref)

			return url
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	const closeModal = () => {
		close()
		setFileUrl('')
		setFile(null)
	}

	const addStory = async () => {
		setIsImageUploading(true)
		try {
			if (userId) {
				const storyRef = collection(db, 'users', userId, 'stories')
				const newStory = {
					addedBy: userId,
					createdAt: new Date(),
					image: await uploadFile(file),
					viewedBy: [],
				}
				await addDoc(storyRef, newStory)
			}
		} catch (err) {
			console.error('Error adding story:', err)
		} finally {
			setIsImageUploading(false)
			closeModal()
		}
	}

	useEffect(() => {
		if (file) {
			open()
		}
	}, [file, open])

	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onload = function (event) {
				if (event.target && typeof event.target.result === 'string') {
					const newImageUrl: string = event.target.result
					setFileUrl(newImageUrl)
				}
			}
			reader.readAsDataURL(file)
		}
	}, [file])

	return (
		<>
			<Modal.Root radius='lg' centered opened={opened} size='auto' onClose={closeModal}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Body
						style={{
							position: 'relative',
							padding: 0,
							backgroundColor: 'black',
						}}>
						<StoryModal
							addStory={addStory}
							isImageUploading={isImageUploading}
							closeModal={closeModal}
							fileUrl={fileUrl}
						/>
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>
			<LoggedInUserStory setFile={setFile} />
		</>
	)
}

export default AddStory
