import { Accordion, Text, Flex, Avatar, TextInput } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
interface AccessibilitySettingsProps {
	croppedImageUrl: string
	altValue: string
	setAltValue: Dispatch<SetStateAction<string>>
}
const AccessibilitySettings = ({ croppedImageUrl, altValue, setAltValue }: AccessibilitySettingsProps) => (
	<Accordion.Item value='customization'>
		<Accordion.Control>Accessibility</Accordion.Control>
		<Accordion.Panel>
			<Text fz='xs' mb='sm'>
				Alt text describes your photos for people with visual impairments. Alt text will be automatically created for
				your photos or you can choose to write your own.
			</Text>
			<Flex justify='flex-start' gap='15px' align='center'>
				<Avatar src={croppedImageUrl} />
				<TextInput value={altValue} onChange={e => setAltValue(e.target.value)} placeholder='Write alt text...' />
			</Flex>
		</Accordion.Panel>
	</Accordion.Item>
)
export default AccessibilitySettings
