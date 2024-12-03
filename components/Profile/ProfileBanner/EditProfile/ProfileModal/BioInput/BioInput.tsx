import { Textarea, Text, Flex } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
interface BioInputProps {
	bioValue: string
	setBioValue: Dispatch<SetStateAction<string>>
	dark: boolean
}
const BioInput = ({ bioValue, setBioValue, dark }: BioInputProps) => {
	return (
		<Flex direction='column' gap='sm' mb='md' sx={{ position: 'relative' }}>
			<Flex direction='column' gap='sm'>
				<Text fw={700} color={dark ? 'white' : 'black'}>
					Bio
				</Text>
				<Text c='dimmed' fz='xs'>
					Write a short description about yourself, your interests, or your work to let others know more about you.
				</Text>
				<Flex
					direction='column'
					sx={{
						border: dark ? '1px solid #323539' : '1px solid  #dbdfE4 ',
						borderRadius: '10px',
						backgroundColor: 'transparent',
					}}
					p='10px 5px'>
					<Textarea
						w='100%'
						value={bioValue}
						onChange={(e: any) => {
							const value = e.target.value
							if (value.length <= 150 || e.nativeEvent.inputType === 'deleteContentBackward') {
								setBioValue(value)
							}
						}}
						placeholder='Bio'
						sx={{
							'.mantine-Textarea-input': {
								backgroundColor: 'transparent',
								border: 'none',
								'&:focus': {
									border: 'none',
								},
							},
						}}
					/>

					<Text align='right' c='dimmed' fz='xs'>
						{`${bioValue.length} /150`}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default BioInput
