import { Box, Flex, TextInput, useMantineColorScheme } from '@mantine/core'
import CustomButtonTransparent from '../../../../CustomButton/CustomButtonTransparent/CustomButtonTransparent'
import { Dispatch, SetStateAction } from 'react'
interface SetHighlightNameProps {
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	setCurrentStep: Dispatch<SetStateAction<'setName' | 'selectStories' | 'setTitleIcon'>>
}
const SetHighlightName = ({ inputValue, setInputValue, setCurrentStep }: SetHighlightNameProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const handleNextStep = () => {
		setCurrentStep('selectStories')
	}
	return (
		<Box>
			<Flex p='lg' sx={{ width: '100%' }}>
				<TextInput
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
					}}
					sx={{
						width: '100%',
						'.mantine-TextInput-input': {
							backgroundColor: dark ? '#121212' : '#fafafa',
							color: dark ? '#f5f5f5' : 'black',
						},
					}}
					variant='filled'
					placeholder='Highlight Name'
				/>
			</Flex>
			<Flex p='xs' sx={{ borderTop: `1px solid ${dark ? '#363636' : '#dbdbdb'} ` }}>
				<CustomButtonTransparent onClick={handleNextStep} disabled={inputValue.trim() == ''} fullWidth>
					Next
				</CustomButtonTransparent>
			</Flex>
		</Box>
	)
}

export default SetHighlightName
