import { TextInput, Text, Flex } from '@mantine/core'
import { Dispatch, SetStateAction, ChangeEvent } from 'react'

interface NameInputProps {
	dark: boolean
	nameValue: string
	setNameValue: Dispatch<SetStateAction<string>>
}

const NameInput = ({ dark, nameValue, setNameValue }: NameInputProps) => {
	return (
		<Flex direction='column' gap='sm' mb='md' sx={{ position: 'relative' }}>
			<Flex direction='column' gap='sm'>
				<Text fw={700} color={dark ? 'white' : 'black'}>
					Name
				</Text>
				<Text c='dimmed' fz='xs'>
					Help people discover your account by using the name you`&apos;re know by: either your full name, nickname, or
					business name.
				</Text>
				<Flex
					direction='column'
					sx={{
						border: dark ? '1px solid #323539' : '1px solid #dbdfE4',
						borderRadius: '10px',
						backgroundColor: 'transparent',
					}}
					p='10px 5px'>
					<TextInput
						w='100%'
						value={nameValue}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							const value = e.target.value

							const inputType = (e.nativeEvent as InputEvent).inputType

							if (value.length <= 16 || inputType === 'deleteContentBackward') {
								setNameValue(value)
							}
						}}
						placeholder='Name'
						sx={{
							'.mantine-TextInput-input': {
								backgroundColor: 'transparent',
								border: 'none',
								spellcheck: false,
							},
							'&:focus': {
								border: 'none',
							},
						}}
					/>
					<Text align='right' fz='xs' c='dimmed'>
						{`${nameValue.length} / 16`}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default NameInput
