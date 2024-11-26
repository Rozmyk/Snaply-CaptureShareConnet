'use client'
import { Box, LoadingOverlay, Flex, Accordion, Image, Avatar } from '@mantine/core'
import ModalHeader from '../../../../../commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import { useSession } from 'next-auth/react'
import InputWithTagsAndUserMention from '../../../../../../InputWithTagsAndUserMention/InputWithTagsAndUserMention'
import { Dispatch, SetStateAction } from 'react'
import AdvancedSettings from './AdvancedSettings/AdvancedSettings'
import UserDetails from './AdvancedSettings/UserDetails/UserDetails'
import AccessibilitySettings from './AccessibilitySettings/AccessibilitySettings'

import { useMediaQuery } from '@mantine/hooks'
interface PostSummaryProps {
	addPost: () => void
	showLoadingOverlay: boolean
	croppedImageUrl: string
	altValue: string
	setAltValue: Dispatch<SetStateAction<string>>
	hideLikes: boolean
	setHideLikes: Dispatch<SetStateAction<boolean>>
	turnOffComments: boolean
	setTurnOffComments: Dispatch<SetStateAction<boolean>>
	prevStep: () => void
	captionValue: string
	setCaptionValue: Dispatch<SetStateAction<string>>
	setMentionedUsers: Dispatch<SetStateAction<string[]>>
	setMentionedTags: Dispatch<SetStateAction<string[]>>
	setCleanText: Dispatch<SetStateAction<string>>
}

const PostSummary = ({
	addPost,
	showLoadingOverlay,
	croppedImageUrl,
	altValue,
	setAltValue,
	hideLikes,
	setHideLikes,
	turnOffComments,
	setTurnOffComments,
	prevStep,
	captionValue,
	setCaptionValue,
	setMentionedUsers,
	setMentionedTags,
	setCleanText,
}: PostSummaryProps) => {
	const session = useSession()
	const isSmallScreen = useMediaQuery('(max-width: 720px)')
	const userImage = session.data?.user?.image
	const username = session.data?.user?.username

	return (
		<Box sx={{ overflow: 'hidden', margin: 'none', padding: 'none' }}>
			<ModalHeader
				onActionIconClick={prevStep}
				buttonText='Share'
				onButtonClick={addPost}
				centerText='Create new post'
			/>
			<Flex direction={isSmallScreen ? 'column' : 'row'} sx={{ height: isSmallScreen ? '100%' : '75vh' }}>
				<LoadingOverlay visible={showLoadingOverlay} overlayBlur={2} />
				{!isSmallScreen && (
					<Box sx={{ maxHeight: '75vh' }}>
						{croppedImageUrl && <Image src={croppedImageUrl} alt='cropped image url' height={'75vh'} width={'75vh'} />}
					</Box>
				)}
				<Box
					p='sm'
					sx={{
						width: isSmallScreen ? '100%' : '350px',
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						maxHeight: '75vh',
					}}>
					{username && <UserDetails userImage={userImage} username={username} />}
					<Flex justify='space-between' align='center' gap='md' pl='sm' pr='sm'>
						<InputWithTagsAndUserMention
							singleLine={false}
							inputValue={captionValue}
							setInputValue={setCaptionValue}
							setMentionedUsers={setMentionedUsers}
							setMentionedTags={setMentionedTags}
							setCleanText={setCleanText}
							maxHeight={200}
							onClick={() => console.log('xd')}
							showButton={false}
							isRepliedInput={false}
						/>
						<Avatar size='lg' src={croppedImageUrl}></Avatar>
					</Flex>
					<Accordion>
						<AccessibilitySettings croppedImageUrl={croppedImageUrl} altValue={altValue} setAltValue={setAltValue} />
						<AdvancedSettings
							hideLikes={hideLikes}
							setHideLikes={setHideLikes}
							turnOffComments={turnOffComments}
							setTurnOffComments={setTurnOffComments}
						/>
					</Accordion>
				</Box>
			</Flex>
		</Box>
	)
}

export default PostSummary
