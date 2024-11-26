import { useState, Dispatch, SetStateAction } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '@/app/firebase'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ReplyInfo from './ReplyInfo/ReplyInfo'
import PhotoUpload from './PhotoUpload/PhotoUpload'
import ActionButtons from './ActionButtons/ActionButtons'
import TextInput from './TextInput/TextInput'
import { Flex, useMantineColorScheme } from '@mantine/core'
import EmoijSelector from '../../../../../EmoijSelector/EmoijSelector'
import { ReplyDataProps } from '../../../../../../types'

interface DetailedActionProps {
	replyToUser: ReplyDataProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
	chatId: string
}
const DetailedAction = ({ replyToUser, setReplyToUser, chatId }: DetailedActionProps) => {
	const [file, setFile] = useState<File | null>(null)
	const [photoUrl, setPhotoUrl] = useState('')
	const [inputValue, setInputValue] = useState('')
	const session = useSession()
	const userId = session?.data?.user?.id
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const sendMessage = async () => {
		try {
			const messagesRef = collection(db, 'chats', chatId, 'messages')
			const newMessage = {
				content: inputValue,
				content_type: isOnlyEmojis(inputValue) ? 'emoji' : 'text',
				sender: userId,
				isReplyToMessage: replyToUser.isReplyToMessage,
				...(replyToUser.isReplyToMessage && { replyInfo: replyToUser }),
				createdAt: new Date(),
			}
			await addDoc(messagesRef, newMessage)
		} catch (err) {
			console.log(err)
		} finally {
			setInputValue('')
			setReplyToUser({
				isReplyToMessage: false,
				content: '',
				attachments: '',
				sender: '',
				messageType: '',
				messageId: '',
				username: '',
			})
		}
	}

	const sendLike = async () => {
		try {
			const messagesRef = collection(db, 'chats', chatId, 'messages')
			const newMessage = {
				content: '❤️',
				content_type: 'emoji',
				sender: userId,
				createdAt: new Date(),
			}
			await addDoc(messagesRef, newMessage)
		} catch (err) {
			console.log(err)
		}
	}

	const uploadPhoto = async () => {
		const imageId = uuidv4()
		if (file) {
			try {
				const imageRef = ref(storage, `chats/${chatId}/${imageId}`)
				const snapshot = await uploadBytes(imageRef, file)
				return await getDownloadURL(snapshot.ref)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const sendPhoto = async () => {
		try {
			const messagesRef = collection(db, 'chats', chatId, 'messages')
			const newMessage = {
				content: '',
				attachments: await uploadPhoto(),
				content_type: 'photo',
				sender: userId,
				createdAt: new Date(),
			}
			await addDoc(messagesRef, newMessage)
		} catch (err) {
			console.log(err)
		} finally {
			setFile(null)
		}
	}

	const handleButtonClick = async () => {
		if (file) {
			await sendPhoto()
			if (inputValue.trim() !== '') await sendMessage()
		} else if (inputValue.trim() !== '') {
			await sendMessage()
		}
	}

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') sendMessage()
	}
	const isOnlyEmojis = (text: string) => {
		const emojiRegex = /^[^\w\s]*$/

		return emojiRegex.test(text)
	}
	return (
		<div>
			{replyToUser.isReplyToMessage && (
				<ReplyInfo
					replyToUser={replyToUser}
					dark={dark}
					replyToYourself={replyToUser.sender == userId}
					setReplyToUser={setReplyToUser}
				/>
			)}
			<Flex
				gap='xs'
				direction='column'
				align='flex-start'
				justify='center'
				sx={{ border: `1px solid ${dark ? '#232323' : '#dadbda'}`, padding: '5px 20px', borderRadius: '20px' }}>
				{file && <PhotoUpload photoUrl={photoUrl} setFile={setFile} />}
				<Flex w={'100%'} gap='xs' align='center' justify='space-between'>
					<EmoijSelector iconSize={24} iconColor={dark ? 'white' : 'black'} setInputValue={setInputValue} />
					<TextInput dark={dark} inputValue={inputValue} setInputValue={setInputValue} handleKeyDown={handleKeyDown} />
					<ActionButtons
						dark={dark}
						inputValue={inputValue}
						file={file}
						handleButtonClick={handleButtonClick}
						sendLike={sendLike}
						setPhotoUrl={setPhotoUrl}
						setFile={setFile}
					/>
				</Flex>
			</Flex>
		</div>
	)
}

export default DetailedAction
