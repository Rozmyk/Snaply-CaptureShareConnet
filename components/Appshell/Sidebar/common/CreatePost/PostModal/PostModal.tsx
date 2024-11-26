'use client'
import { useState } from 'react'
import { Modal, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import PostSummary from './PostSummary/PostSummary'
import { useSession } from 'next-auth/react'
import DiscardConfirmationModal from '../../../../commonComponents/CreatePostModal/DiscardConfirmationModal/DiscardConfirmationModal'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '@/app/firebase'
import { v4 as uuidv4 } from 'uuid'
import CropImage from './CropImage/CropImage'
import DropzoneArea from './DropzoneArea/DropzoneArea'

interface PostModalProps {
	opened: boolean
	close: () => void
}
const PostModal = ({ opened, close }: PostModalProps) => {
	const [stepActive, setStepActive] = useState(1)
	const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false)
	const [fileData, setFileData] = useState<File | null>(null)
	const [croppedFileData, setCroppedFileData] = useState<File | null>(null)
	const [croppedImageUrl, setCroppedImageUrl] = useState<string>('')
	const [imageUrl, setImageUrl] = useState<string>('')
	const [captionValue, setCaptionValue] = useState<string>('')
	const [altValue, setAltValue] = useState<string>('')
	const [hideLikes, setHideLikes] = useState<boolean>(false)
	const [mentionedTags, setMentionedTags] = useState<string[]>([])
	const [mentionedUsers, setMentionedUsers] = useState<string[]>([])
	const [cleanText, setCleanText] = useState<string>('')
	const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false)
	const [turnOffComments, setTurnOffComments] = useState<boolean>(false)

	const session = useSession()
	const isSmallScreen = useMediaQuery('(max-width: 720px)')
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const nextStep = () => setStepActive(current => (current < 3 ? current + 1 : current))
	const prevStep = () => setStepActive(current => (current > 0 ? current - 1 : current))
	const addPost = async () => {
		try {
			setShowLoadingOverlay(true)
			const postsRef = collection(db, 'posts')
			const newPost = {
				addedBy: userId,
				caption: cleanText,
				createdAt: new Date(),
				image: await uploadFile(croppedFileData),
				mentionedUsers: mentionedUsers,
				mentionedTags: mentionedTags,
				turnOffComments: turnOffComments,
				hideLikes: hideLikes,
				alt: altValue,
			}
			await addDoc(postsRef, newPost)
			setShowLoadingOverlay(false)

			hideModal()
		} catch (error) {
			console.log(error)
		}
	}

	const uploadFile = async (data: File | HTMLCanvasElement | null): Promise<string | null> => {
		if (!data) {
			console.warn('No data.')
			return null
		}

		const imageId = uuidv4()
		let blobData: Blob

		if (data instanceof HTMLCanvasElement) {
			blobData = await new Promise<Blob>(resolve => data.toBlob(blob => resolve(blob!)))
		} else {
			blobData = data
		}

		try {
			const imageRef = ref(storage, `xd/${imageId}`)
			const snapshot = await uploadBytes(imageRef, blobData)
			const url = await getDownloadURL(snapshot.ref)
			setImageUrl(url)
			return url
		} catch (error) {
			console.error('Error with sending file', error)
			return null
		}
	}

	const hideModal = () => {
		setShowLoadingOverlay(false)
		close()
		setAltValue('')
		setFileData(null)
		setStepActive(1)
		setImageUrl('')
		setCaptionValue('')
		setHideLikes(false)
		setTurnOffComments(false)
	}
	const onCloseAction = () => {
		if (fileData && !showLoadingOverlay) {
			setShowDiscardConfirm(true)
		} else {
			hideModal()
		}
	}

	return (
		<>
			<DiscardConfirmationModal
				modalStatus={showDiscardConfirm}
				setModalStatus={setShowDiscardConfirm}
				hideModal={hideModal}
			/>
			<Modal
				fullScreen={isSmallScreen}
				opened={opened}
				centered
				size='auto'
				padding={0}
				radius='md'
				withCloseButton={false}
				sx={{
					overflow: 'hidden',
					padding: 0,
					margin: 0,
					'.mantine-Modal-content	': {
						backgroundColor: dark ? '#262727' : '#fefffe',
					},
				}}
				onClose={onCloseAction}>
				<div style={{ margin: 0, padding: 0, overflow: 'hidden', transition: '1s' }}>
					{stepActive === 1 && (
						<DropzoneArea
							hideModal={hideModal}
							setImageUrl={setImageUrl}
							setFileData={setFileData}
							nextStep={nextStep}
						/>
					)}

					{stepActive === 2 && (
						<CropImage
							setCroppedFileData={setCroppedFileData}
							nextStep={nextStep}
							prevStep={prevStep}
							imageUrl={imageUrl}
							setCroppedImageUrl={setCroppedImageUrl}
						/>
					)}
					{stepActive === 3 && (
						<PostSummary
							setCleanText={setCleanText}
							addPost={addPost}
							showLoadingOverlay={showLoadingOverlay}
							croppedImageUrl={croppedImageUrl}
							altValue={altValue}
							captionValue={captionValue}
							setCaptionValue={setCaptionValue}
							setMentionedUsers={setMentionedUsers}
							setMentionedTags={setMentionedTags}
							setAltValue={setAltValue}
							prevStep={prevStep}
							hideLikes={hideLikes}
							setHideLikes={setHideLikes}
							turnOffComments={turnOffComments}
							setTurnOffComments={setTurnOffComments}
						/>
					)}
				</div>
			</Modal>
		</>
	)
}

export default PostModal
