import { Flex, Text } from '@mantine/core'
import { SetStateAction, Dispatch } from 'react'

interface QuickReactionProps {
	inputFocused: boolean
	sendReply: (emoji: string) => void
	setInputFocused: Dispatch<SetStateAction<boolean>>
}
const QuickReaction = ({ inputFocused, sendReply, setInputFocused }: QuickReactionProps) => {
	const emojiArray = ['😂', '😮', '😍', '😢', '👏', '🔥', '🎉', '💯']

	return (
		inputFocused && (
			<div
				onClick={() => {
					setInputFocused(false)
				}}
				style={{
					zIndex: 10200,
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0,0,0,0.5)',
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}>
				<Flex direction='column' justify='flex-end' h='100%' pb='xl' align='center'>
					<Text fw={600} fz='xl' mb='md' color='white'>
						Quick reactions
					</Text>
					<Flex
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, 1fr)',
							width: 300,
						}}>
						{emojiArray.map((emoji, index) => (
							<Text
								onClick={() => {
									sendReply(emoji)
								}}
								key={index}
								fz={35}
								sx={{ textAlign: 'center', cursor: 'pointer' }}>
								{emoji}
							</Text>
						))}
					</Flex>
				</Flex>
			</div>
		)
	)
}

export default QuickReaction
