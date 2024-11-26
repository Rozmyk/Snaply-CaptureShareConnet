import { Accordion, Switch } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
interface AdvancedSettingsProps {
	hideLikes: boolean
	setHideLikes: Dispatch<SetStateAction<boolean>>
	turnOffComments: boolean
	setTurnOffComments: Dispatch<SetStateAction<boolean>>
}
const AdvancedSettings = ({ hideLikes, setHideLikes, turnOffComments, setTurnOffComments }: AdvancedSettingsProps) => (
	<Accordion.Item value='flexibility'>
		<Accordion.Control>Advanced settings</Accordion.Control>
		<Accordion.Panel>
			<Switch
				sx={{
					'.mantine-Switch-track': {
						backgroundColor: '#323438',
						'&[data-active]': {
							backgroundColor: 'red',
							border: '1px solid red',
						},
					},
				}}
				checked={hideLikes}
				onChange={event => setHideLikes(event.currentTarget.checked)}
				mb='xs'
				labelPosition='left'
				label='Hide like and view counts on this post'
				description="Only you will see the total number of likes and views on this post. You can change this later by going to the ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings."
			/>
			<Switch
				checked={turnOffComments}
				onChange={event => setTurnOffComments(event.currentTarget.checked)}
				sx={{
					'.mantine-Switch-track': {
						backgroundColor: '#323438',
						'&[data-active]': {
							backgroundColor: 'red',
							border: '1px solid red',
						},
					},
				}}
				labelPosition='left'
				label='Turn off commenting'
				description='You can change this later by going to the ··· menu at the top of your post.'
			/>
		</Accordion.Panel>
	</Accordion.Item>
)
export default AdvancedSettings
