import { ActionIcon } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
interface SingleCommentDetailsSettingsProps {
	dark: boolean
}
const SingleCommentDetailsSettings = ({ dark }: SingleCommentDetailsSettingsProps) => {
	return (
		<ActionIcon size='xs'>
			<IconDots style={{ color: dark ? '#a8a8a8' : '#737373' }} />
		</ActionIcon>
	)
}

export default SingleCommentDetailsSettings
