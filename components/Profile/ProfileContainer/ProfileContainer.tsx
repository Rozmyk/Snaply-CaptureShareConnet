'use client'
import { useState, useEffect } from 'react'
import ProfileBanner from '../ProfileBanner/ProfileBanner'
import ProfileTabs from '../ProfileTabs/ProfileTabs'
import { getUserDataByUsername } from '../../../utils/getUserDataByUsername'
import PrivateAccount from '../PrivateAccount/PrivateAccount'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Container, Loader, Flex, Box } from '@mantine/core'
import SavedStories from '../SavedStories/SavedStories'
import Footer from '../../Footer/Footer'
import ErrorPage from '../../ErrorPage/ErrorPage'
import { UserProps } from '../../../types'

const ProfileContainer = () => {
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [userSavedPostIds, setUserSavedPostIds] = useState<string[]>([])
	const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)
	const [userNotFound, setUserNotFound] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const session = useSession()
	const userId = session?.data?.user?.id
	const params = useParams()

	useEffect(() => {
		const fetchUserData = async () => {
			const usernameParam = params.profile_name
			const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam

			const user: UserProps | null = await getUserDataByUsername(username.toLowerCase())
			if (user) {
				setUserData(user)

				if (user.savedPosts && user.savedPosts.length > 0) {
					setUserSavedPostIds(user.savedPosts)
				}
				setIsCurrentUser(userId === user.id)
				setLoading(false)
			} else {
				setUserNotFound(true)
			}
		}
		fetchUserData()
	}, [userId, params.profile_name])

	if (userNotFound) {
		return <ErrorPage />
	}

	return loading ? (
		<Container h='100vh'>
			<Flex h='100%' justify='center' align='center'>
				<Loader size='md' color='gray'></Loader>
			</Flex>
		</Container>
	) : (
		<Container style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<div style={{ flex: 1 }}>
				<Box h={'100%'}>
					{userData && userId && (
						<>
							<ProfileBanner
								isCurrentUser={isCurrentUser}
								username={userData.username}
								following={userData.following}
								followers={userData.followers}
								descriptionLink={userData.descriptionLink}
								description={userData.description}
								name={userData.name}
								id={userData.id}
								image={userData.image}></ProfileBanner>
							<SavedStories isCurrentUser={isCurrentUser} id={userData.id} />
							{userData.private ? (
								userData.followers?.includes(userId) ? (
									<ProfileTabs savedPostIds={userSavedPostIds} isCurrentUser={isCurrentUser} userId={userData.id} />
								) : (
									<PrivateAccount />
								)
							) : (
								<ProfileTabs savedPostIds={userSavedPostIds} isCurrentUser={isCurrentUser} userId={userData.id} />
							)}
						</>
					)}
				</Box>
			</div>
			<Footer />
		</Container>
	)
}

export default ProfileContainer
