import { PostProps, UserProps } from '../../../../../types'
import DetailsDescription from '../../../../DetailsPost/DetailsDescription/DetailsDescription'
interface DetailsDescriptionProps {
	postLoading: boolean
	postData: PostProps | null
	userData: UserProps | null
	width: number
}
const CommentsDescription = ({ postLoading, postData, userData, width }: DetailsDescriptionProps) => {
	return (
		!postLoading &&
		postData &&
		userData && (
			<DetailsDescription
				maxWidth={width}
				descriptionData={{
					createdAt: postData.createdAt,
					addedBy: postData.addedBy,
					caption: postData.caption,
					mentionedTags: postData.mentionedTags,
					mentionedUsers: postData.mentionedUsers,
					username: userData.username,
					userImage: userData.image,
				}}
			/>
		)
	)
}

export default CommentsDescription
