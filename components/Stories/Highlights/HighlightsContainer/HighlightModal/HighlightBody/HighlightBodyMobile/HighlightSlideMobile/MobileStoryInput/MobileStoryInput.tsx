import { Flex, Button, ActionIcon } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { SetStateAction, Dispatch } from 'react'
import './style.css'

interface MobileStoryInputProps {
	setInputFocused: Dispatch<SetStateAction<boolean>>
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	inputFocused: boolean
	sendReply: (data: string) => void
}

const MobileStoryInput = ({
	setInputFocused,
	inputValue,
	setInputValue,
	inputFocused,
	sendReply,
}: MobileStoryInputProps) => {
	return (
		<Flex justify='space-between' align='center' p='sm' gap='xs' style={{ height: 60, width: '100%' }}>
			<Flex
				justify='center'
				align='center'
				style={{
					height: 44,
					border: '1.5px solid #dbdbdb',
					borderRadius: '20px',
					width: '100%',
					padding: '8px 11px',
				}}>
				<input
					className='input-placeholder'
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
					}}
					onFocus={() => {
						setInputFocused(true)
					}}
					placeholder='Send message'
					style={{
						outline: 'none',
						height: 34,
						fontWeight: 500,
						border: 'none',
						backgroundColor: 'transparent',
						color: '#dbdbdb',
						width: '100%',
						fontSize: 14,
					}}
				/>
				{inputValue.trim() !== '' && inputFocused && (
					<Button
						variant='outline'
						sx={{ border: 'none', color: '#fefffe' }}
						compact
						onClick={() => {
							sendReply(inputValue)
						}}>
						Send
					</Button>
				)}
			</Flex>

			{!inputFocused && (
				<ActionIcon
					size='xl'
					sx={{
						'&:hover': {
							backgroundColor: 'transparent',
						},
					}}>
					<IconSend
						size={30}
						style={{
							color: '#fefffe',
						}}
					/>
				</ActionIcon>
			)}
		</Flex>
	)
}

export default MobileStoryInput
