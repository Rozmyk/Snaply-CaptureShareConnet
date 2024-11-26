import { BackgroundImage } from '@mantine/core'
import CustomHighlightHeader from './CustomHighlightHeader/CustomHighlightHeader'
import { UserProps } from '../../../../../../../../../types'
import { Timestamp } from 'firebase-admin/firestore'
interface CustomHighlightProps {
	action: (action: string) => void
	isPaused: boolean
	story: {
		duration: number
		url: string
		user: UserProps
		createdAt: Timestamp
		id: string
		content: (props: any) => JSX.Element
	}
}
const CustomHighlight = (props: CustomHighlightProps) => {
	return (
		<div style={{ position: 'relative', maxWidth: 300, height: '100%' }}>
			<BackgroundImage radius='sm' w={300} h={500} src={props.story.url}>
				<CustomHighlightHeader {...props} />
			</BackgroundImage>
		</div>
	)
}

export default CustomHighlight
