import { IconMoodSmile } from '@tabler/icons-react'
import { ActionIcon, Popover, useMantineColorScheme } from '@mantine/core'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Dispatch, SetStateAction } from 'react'
interface EmoijSelectorProps {
	setInputValue: Dispatch<SetStateAction<string>>
	iconSize: number | string
	iconColor?: string
}
const EmoijSelector = ({ setInputValue, iconSize, iconColor }: EmoijSelectorProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<>
			<Popover withinPortal trapFocus position='top-start' withArrow arrowPosition='side'>
				<Popover.Target>
					<ActionIcon size={iconSize}>
						{iconColor ? <IconMoodSmile style={{ color: iconColor }} /> : <IconMoodSmile />}
					</ActionIcon>
				</Popover.Target>
				<Popover.Dropdown p='0' style={{ zIndex: 100, position: 'absolute' }}>
					<Picker
						theme={dark ? 'dark' : 'light'}
						data={data}
						onEmojiSelect={(emoji: any) => {
							setInputValue(prevValue => prevValue + emoji.native)
						}}
					/>
				</Popover.Dropdown>
			</Popover>
		</>
	)
}

export default EmoijSelector
