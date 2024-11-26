import { Box, Text, TextInput, Divider, CloseButton, useMantineColorScheme } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
interface SearchPanelProps {
	value: string
	setValue: Dispatch<SetStateAction<string>>
}
const SearchPanel = ({ value, setValue }: SearchPanelProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<>
			<Box p='xs'>
				<Text fz={24} fw={600} mb='xl' mt='xl' color={dark ? 'white' : 'black'}>
					Search
				</Text>
				<TextInput
					sx={{
						'.mantine-TextInput-input': {
							backgroundColor: dark ? '#272627' : '#eeefee',
							borderColor: 'transparent',
						},
					}}
					value={value}
					onChange={e => {
						setValue(e.target.value)
					}}
					rightSection={
						value !== '' && (
							<CloseButton
								radius='50%'
								color='gray'
								onClick={() => {
									setValue('')
								}}
								size='xs'
							/>
						)
					}
					placeholder='Search'
				/>
			</Box>
			<Divider w='100%' mb='md' mt='xl' color={dark ? '#232323' : '#dadadb'} />
		</>
	)
}

export default SearchPanel
