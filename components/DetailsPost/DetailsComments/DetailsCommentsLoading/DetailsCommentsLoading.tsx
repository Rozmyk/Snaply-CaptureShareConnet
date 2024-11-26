import SingleCommentDetailsLoading from '../../../SingleCommentDetails/SingleCommentDetailsLoading/SingleCommentDetailsLoading'
import { Box } from '@mantine/core'
interface DetailsCommentsLoadingProps {
	height: number
}
const DetailsCommentsLoading = ({ height }: DetailsCommentsLoadingProps) => {
	return (
		<Box sx={{ width: '100%', height: height }}>
			<SingleCommentDetailsLoading />
			<SingleCommentDetailsLoading />
			<SingleCommentDetailsLoading />
		</Box>
	)
}

export default DetailsCommentsLoading
