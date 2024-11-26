'use client'
import { useState, useEffect, useCallback } from 'react'
import { Grid, Container, useMantineColorScheme } from '@mantine/core'
import DetailsHeader from './DetailsHeader/DetailsHeader.'
import DetailsComments from './DetailsComments/DetailsComments'
import { useParams } from 'next/navigation'
import { getPostData } from '../../utils/getPostData'
import { fetchUserData } from '../../utils/user/fetchUserData'
import DetailsAction from './DetailsAction/DetailsAction'
import DetailsPhoto from './DetailsPhoto/DetailsPhoto'
import { useElementSize, useMediaQuery } from '@mantine/hooks'
import { ReplyToCommentProps, DescriptionDataProps, PostProps, UserProps } from '../../types'
const DetailsPost = () => {
	const [postData, setPostData] = useState<PostProps | null>(null)
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const params = useParams()
	const [descriptionData, setDescriptionData] = useState<DescriptionDataProps | null>(null)
	const [replyData, setReplyData] = useState<ReplyToCommentProps | null>(null)
	const { ref, width } = useElementSize()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	const idParam = params.id

	let postId: string
	if (Array.isArray(idParam)) {
		postId = idParam[0]
	} else {
		postId = idParam
	}

	const fetchData = useCallback(async () => {
		const fetchedPostData = await getPostData(postId)

		setPostData(fetchedPostData)
		let fetchedUserData
		if (fetchedPostData?.addedBy) {
			fetchedUserData = await fetchUserData(fetchedPostData.addedBy)
		}

		if (fetchedUserData) {
			setUserData(fetchedUserData)
		}

		if (fetchedPostData && fetchedUserData) {
			setDescriptionData({
				createdAt: fetchedPostData.createdAt,
				username: fetchedUserData.username,
				userImage: fetchedUserData.image,
				caption: fetchedPostData.caption,
				addedBy: fetchedUserData.id,
				mentionedUsers: fetchedPostData.mentionedUsers,
				mentionedTags: fetchedPostData.mentionedTags,
			})
		}
		setLoading(false)
	}, [postId])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return (
		<Container size='md' pt='sm' h={600}>
			<Grid>
				<Grid.Col
					span={isSmallScreen ? 12 : 7}
					sx={{
						position: 'relative',
						maxHeight: 600,
						padding: 0,
						border: `1px solid ${dark ? '#232323' : '#dedede'}`,
						borderRight: 'none',
						overflow: 'hidden',
					}}>
					{postData && <DetailsPhoto src={postData.image} loading={loading} />}
				</Grid.Col>

				<Grid.Col
					ref={ref}
					span={isSmallScreen ? 12 : 5}
					sx={{
						maxHeight: 600,
						maxWidth: '100%',
						display: 'flex',
						border: `1px solid ${dark ? '#232323' : '#dedede'}`,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start',
						margin: 0,
						padding: 0,
					}}>
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

					{descriptionData && (
						<DetailsComments
							height={380}
							descriptionData={descriptionData}
							setReplyData={setReplyData}
							postId={postId}
						/>
					)}

					{postData && (
						<DetailsAction
							postId={postId}
							maxWidth={width}
							postData={postData}
							replyData={replyData}
							setReplyData={setReplyData}
							loading={loading}></DetailsAction>
					)}
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export default DetailsPost
