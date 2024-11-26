'use client'
import { useState, useEffect, ReactNode } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Text, Flex, Loader, useMantineColorScheme } from '@mantine/core'
import ModalHeader from '../../../../../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import { fetchUserData } from '../../../../../../utils/user/fetchUserData'
import SingleReaction from './SingleReaction/SingleReaction'
import { SingleReactionProps, UserProps } from '../../../../../../types'
interface ReactToMessageProps {
	children: ReactNode
	messageId: string
	chatId: string
	reactions: SingleReactionProps[]
	isLoggedUserId: boolean
}
interface updatedSingleReactionProps extends SingleReactionProps {
	user: UserProps
}
function ReactToMessage({ children, messageId, chatId, reactions, isLoggedUserId }: ReactToMessageProps) {
	console.log('Message ID:', messageId)

	const [opened, { open, close }] = useDisclosure(false)
	const [loading, setLoading] = useState(true)
	const [updatedReactions, setUpdatedReactions] = useState<updatedSingleReactionProps[]>([])
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	useEffect(() => {
		const fetchData = async () => {
			if (reactions && reactions.length > 0) {
				const newUpdatedReactions: updatedSingleReactionProps[] = []

				for (const reaction of reactions) {
					try {
						const userData = await fetchUserData(reaction.userId)

						if (userData) {
							const updatedReaction: updatedSingleReactionProps = { ...reaction, user: userData }
							newUpdatedReactions.push(updatedReaction)
						} else {
							console.warn(`User data for userId ${reaction.userId} not found`)
						}
					} catch (err) {
						console.error(`Error fetching user data for userId ${reaction.userId}:`, err)
					}
				}

				setUpdatedReactions(newUpdatedReactions)
				setLoading(false)
			}
		}

		fetchData()
	}, [reactions])

	return (
		<div style={{ position: 'relative' }}>
			<Modal.Root centered opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content sx={{ backgroundColor: dark ? '#272627' : '#fffefe', borderRadius: '20px' }}>
					<ModalHeader centerText='Reactions' closeButton closeButtonAction={close} />
					<Modal.Body m={0} p={0} mb='sm' mt='sm'>
						{loading ? (
							<Flex m='lg' justify='center' align='center'>
								<Loader color='gray'></Loader>
							</Flex>
						) : (
							updatedReactions &&
							updatedReactions.map(reactionItem => (
								<SingleReaction
									key={reactionItem.user.id}
									messageId={messageId}
									chatId={chatId}
									closeModal={close}
									user={reactionItem.user}
									reaction={reactionItem.reaction}
								/>
							))
						)}
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<Flex
				justify='center'
				align='center'
				sx={{
					position: 'absolute',
					bottom: '-12px',
					right: isLoggedUserId ? 0 : undefined,
					left: !isLoggedUserId ? 0 : undefined,
					zIndex: 100,
					backgroundColor: dark ? '#272627' : '#eeefee',
					padding: '0 6px',
					borderRadius: '11px',
					border: dark ? '2px solid black' : '2px solid white',
				}}>
				{reactions && reactions.length > 0 && (
					<Flex onClick={open} justify='center' align='center'>
						{reactions.map((reaction, index) => (
							<Text fz={'.75rem'} key={index}>
								{reaction.reaction}
							</Text>
						))}
						{reactions.length > 1 && (
							<Text fw={600} fz='xs' ml='2px'>
								{reactions.length}
							</Text>
						)}
					</Flex>
				)}
			</Flex>
			{children}
		</div>
	)
}
export default ReactToMessage
