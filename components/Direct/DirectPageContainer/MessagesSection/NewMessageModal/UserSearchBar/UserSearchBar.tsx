import { Input, Flex, Text } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

interface UserSearchBarProps {
	value: string
	setValue: Dispatch<SetStateAction<string>>
}
const UserSearchBar = ({ value, setValue }: UserSearchBarProps) => {
	return (
		<Flex sx={{ width: '100%' }} justify='space-between' align='center' pl='md' pr='md' pb='5px' pt='5px' gap='sm'>
			<Text fz='md' fw={600}>
				To:
			</Text>

			<Input
				value={value}
				onChange={event => setValue(event.currentTarget.value)}
				placeholder='Search...'
				sx={{
					width: '100%',
					input: {
						border: 'none',
						'&:focus-within': {
							borderColor: 'transparent',
						},
					},
				}}></Input>
		</Flex>
	)
}

export default UserSearchBar
