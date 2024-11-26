import { useClipboard } from '@mantine/hooks'
import RegularButton from '../RegularButton/RegularButton'
interface CopyLinkButtonProps {
	postId: string
}
const CopyLinkButton = ({ postId }: CopyLinkButtonProps) => {
	const clipboard = useClipboard({ timeout: 500 })
	const urlToCopy = window.location.origin + '/post/' + postId
	return (
		<RegularButton onClick={() => clipboard.copy(urlToCopy)}>{clipboard.copied ? 'Copied' : 'Copy link'}</RegularButton>
	)
}

export default CopyLinkButton
