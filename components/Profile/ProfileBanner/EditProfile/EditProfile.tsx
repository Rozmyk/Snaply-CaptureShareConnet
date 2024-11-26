'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useDisclosure } from '@mantine/hooks'
import ProfileCustomButton from '../../ProfileCustomButton/ProfileCustomButton'
import ProfileModal from './ProfileModal/ProfileModal'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/app/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getDoc } from 'firebase/firestore'

const EditProfile = () => {
	const [bioValue, setBioValue] = useState('')
	const [websiteValue, setWebsiteValue] = useState('')
	const [websiteValueError, setWebsiteValueError] = useState(false)
	const [temporaryPhoto, setTemporaryPhoto] = useState<File | null>(null)
	const [nameValue, setNameValue] = useState('')
	const [loading, setLoading] = useState(false)
	const [opened, { open, close }] = useDisclosure(false)
	const session = useSession()
	const userId = session?.data?.user?.id

	const closeModal = () => {
		close()
		setBioValue('')
		setWebsiteValue('')
		setWebsiteValueError(false)
		setTemporaryPhoto(null)
	}

	const checkWebsite = (website: string) => {
		const urlRegex = /^(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?$/
		return urlRegex.test(website)
	}

	const uploadPhoto = async (fileToUpload: File) => {
		if (temporaryPhoto) {
			try {
				const imageRef = ref(storage, `userProfilesPhoto/${userId}`)
				const snapshot = await uploadBytes(imageRef, fileToUpload)
				return await getDownloadURL(snapshot.ref)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const setUpChanges = async () => {
		if (userId) {
			try {
				setLoading(true)

				const userRef = doc(db, 'users', userId)

				const userDoc = await getDoc(userRef)

				if (!userDoc.exists()) {
					console.error('Dokument nie istnieje')
					return
				}

				const currentData = userDoc.data() as {
					description?: string
					descriptionLink?: string
					name?: string
					image?: string
				}

				const updatedFields: {
					description?: string
					descriptionLink?: string
					name?: string
					image?: string
				} = {}

				if (bioValue && bioValue.length <= 150) {
					updatedFields.description = bioValue
				}

				if (websiteValue && !websiteValueError) {
					updatedFields.descriptionLink = websiteValue
				}

				if (nameValue && nameValue.length <= 16) {
					updatedFields.name = nameValue
				}

				if (temporaryPhoto) {
					updatedFields.image = await uploadPhoto(temporaryPhoto)
				} else {
					updatedFields.image = currentData.image ?? ''
				}

				const filteredUpdatedFields = Object.fromEntries(
					Object.entries(updatedFields).filter(([_, value]) => value !== undefined && value !== '')
				)

				await updateDoc(userRef, filteredUpdatedFields)

				setLoading(false)
				closeModal()
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<>
			<ProfileModal
				nameValue={nameValue}
				setNameValue={setNameValue}
				opened={opened}
				closeModal={closeModal}
				bioValue={bioValue}
				setBioValue={setBioValue}
				websiteValue={websiteValue}
				setWebsiteValue={setWebsiteValue}
				websiteValueError={websiteValueError}
				setWebsiteValueError={setWebsiteValueError}
				checkWebsite={checkWebsite}
				temporaryPhoto={temporaryPhoto}
				setTemporaryPhoto={setTemporaryPhoto}
				loading={loading}
				setUpChanges={setUpChanges}
			/>
			<ProfileCustomButton onClick={open}>Edit profile</ProfileCustomButton>
		</>
	)
}

export default EditProfile
