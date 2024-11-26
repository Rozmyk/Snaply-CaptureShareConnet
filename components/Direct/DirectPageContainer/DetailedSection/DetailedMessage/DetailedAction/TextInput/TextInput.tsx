import { Input } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
interface TextInputProps {
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	handleKeyDown: (e: any) => void
	dark: boolean
}
const TextInput = ({ inputValue, setInputValue, handleKeyDown, dark }: TextInputProps) => (
	<Input
		value={inputValue}
		onKeyDown={handleKeyDown}
		onChange={e => setInputValue(e.target.value)}
		placeholder='Message...'
		variant='unstyled'
		sx={{
			width: '100%',

			'.mantine-Input-input': {
				color: dark ? 'white' : 'black',
			},
		}}
	/>
)

export default TextInput
