'use client'
import { Grid, Image, Box } from '@mantine/core'
import { useState } from 'react'
import DetailsHeader from '../DetailsHeader/DetailsHeader.'
import DetailsComments from '../DetailsComments/DetailsComments'
import DetailsAction from '../DetailsAction/DetailsAction'
import { useElementSize } from '@mantine/hooks'
import { DescriptionDataProps, PostProps, UserProps, ReplyToCommentProps } from '../../../types'
interface DetailsPostModalProps {
	postId: string
	postData: PostProps | null
	userData: UserProps | null
	loading: boolean
	descriptionData: DescriptionDataProps
}
const DetailsPostModal = ({ postId, postData, userData, loading, descriptionData }: DetailsPostModalProps) => {
	const [replyData, setReplyData] = useState<ReplyToCommentProps | null>(null)
	const { ref: ContainerRef, width: ContainerWidth, height: ContainerHeight } = useElementSize()
	const { ref: DetailedHeaderRef, height: DetailedHeaderHeight } = useElementSize()
	const { ref: DetailedActionRef, height: DetailedActionHeight } = useElementSize()
	return (
		<Grid h={'90vh'} ref={ContainerRef} sx={{ overflow: 'hidden' }}>
			<Grid.Col span={6} h={'100%'} p={0} sx={{ overflow: 'hidden' }}>
				{postData && <Image w='auto' height={ContainerHeight} src={postData.image} alt={postData.alt} />}
			</Grid.Col>
			<Grid.Col
				span={6}
				h={'100%'}
				p={0}
				mah={ContainerHeight}
				sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
				<Box ref={DetailedHeaderRef}>
					{postData && userData && (
						<DetailsHeader
							hideLikes={postData.hideLikes}
							turnOffComments={postData.turnOffComments}
							postId={postId}
							loading={loading}
							addedBy={postData.addedBy}
							username={userData.username}
							image={userData.image}
						/>
					)}
				</Box>
				<Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
					<DetailsComments
						height={ContainerHeight - DetailedActionHeight - DetailedHeaderHeight - 25}
						descriptionData={descriptionData}
						postId={postId}
						setReplyData={setReplyData}
					/>
				</Box>
				{postData && (
					<Box ref={DetailedActionRef} p='sm'>
						<DetailsAction
							postData={postData}
							maxWidth={ContainerWidth}
							replyData={replyData}
							setReplyData={setReplyData}
							loading={loading}
							postId={postId}
						/>
					</Box>
				)}
			</Grid.Col>
		</Grid>
	)
}

export default DetailsPostModal
