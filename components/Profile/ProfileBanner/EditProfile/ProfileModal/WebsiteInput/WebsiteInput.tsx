import { TextInput, Text, Flex } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

interface WebsiteInputProps {
	websiteValue: string
	setWebsiteValue: Dispatch<SetStateAction<string>>
	websiteValueError: boolean
	setWebsiteValueError: Dispatch<SetStateAction<boolean>>
	checkWebsite: (website: string) => boolean
	dark: boolean
}

const WebsiteInput = ({
	websiteValue,
	setWebsiteValue,
	websiteValueError,
	setWebsiteValueError,
	checkWebsite,
	dark,
}: WebsiteInputProps) => {
	return (
		<Flex direction='column' gap='sm' mb='md'>
			<Text fw={700}>Website</Text>
			<TextInput
				radius='md'
				value={websiteValue}
				onChange={e => {
					setWebsiteValue(e.target.value)
					setWebsiteValueError(!checkWebsite(e.target.value))
				}}
				sx={{
					'.mantine-TextInput-input': {
						backgroundColor: 'transparent',
						border: websiteValueError ? '1px solid #ec4c54' : dark ? '1px solid #323539' : '1px solid  #dbdfE4 ',
					},
				}}
				placeholder='Website'
			/>
		</Flex>
	)
}

export default WebsiteInput
