import React, { useState, useEffect, ReactNode } from 'react'
import { Popover, useMantineColorScheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { db } from '@/app/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import UserProfile from './UserProfile/UserProfile'
import UserStats from './UserStats/UserStats'
import UserPosts from './UserPosts/UserPosts'
import FollowButton from './FollowButton/FollowButton'
import { fetchUserData } from '../../utils/user/fetchUserData'
import { checkIfUserFollowed } from '../../utils/checkIfUserFollowed'
import ShowUserDetailsLoading from './ShowUserDetailsLoading/ShowUserDetailsLoading'
import EditProfileButton from './EditProfileButton/EditProfileButton'
import { UserProps, PostProps } from '../../types'
import PrivateAccount from './PrivateAccount/PrivateAccount'

interface ShowUserDetailsProps {
	children: ReactNode
	userDetailsId: string
}
const ShowUserDetails = ({ children, userDetailsId }: ShowUserDetailsProps) => {
	const [opened, { close, open }] = useDisclosure(false)
	const session = useSession()
	const userId = session?.data?.user?.id
	const [userData, setUserData] = useState<UserProps | null>(null)
	const [isFollowed, setIsFollowed] = useState<boolean>(false)
	const [userPost, setUserPost] = useState<PostProps[] | null>(null)
	const [postLength, setPostLength] = useState<number>(0)
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	const getPostsLength = async (userDetailsId: string) => {
		try {
			const q = query(collection(db, 'posts'), where('addedBy', '==', userDetailsId))
			const querySnapshot = await getDocs(q)
			const numberOfPosts = querySnapshot.size
			return numberOfPosts
		} catch (error) {
			console.error('Błąd podczas pobierania informacji o postach:', error)
			return null
		}
	}

	useEffect(() => {
		const fetchIsFollowed = async () => {
			if (userId) {
				const followed = await checkIfUserFollowed(userId, userDetailsId)
				setIsFollowed(followed)
			}
		}

		fetchIsFollowed()
	}, [userId, userDetailsId])

	useEffect(() => {
		const getUserData = async () => {
			const user = await fetchUserData(userDetailsId)
			if (user) {
				setUserData(user)
			}
		}
		getUserData()
	}, [isHovered, userDetailsId])

	useEffect(() => {
		const fetchPostLength = async () => {
			const fetchedPosts = await getPostsLength(userDetailsId)
			if (fetchedPosts) {
				setPostLength(fetchedPosts)
			}
		}
		if (userDetailsId) {
			fetchPostLength()
		}
	}, [userDetailsId])

	useEffect(() => {
		const getUserPost = async () => {
			try {
				const q = query(
					collection(db, 'posts'),
					where('addedBy', '==', userDetailsId),
					orderBy('createdAt', 'desc'),
					limit(3)
				)

				const querySnapshot = await getDocs(q)
				const posts: PostProps[] = []
				querySnapshot.forEach(doc => {
					const data = doc.data() as Omit<PostProps, 'id'>
					const postToAdd: PostProps = { ...data, id: doc.id }
					posts.push(postToAdd)
				})
				setUserPost(posts)
				setLoading(false)
				setDataLoaded(true)
			} catch (error) {
				console.log(error)
			}
		}
		if (!isSmallScreen) {
			getUserPost()
		}
	}, [userDetailsId, isSmallScreen])

	useEffect(() => {
		if (isHovered && dataLoaded && !isSmallScreen) {
			const hoverTimeout = setTimeout(() => {
				open()
			}, 500)

			return () => {
				clearTimeout(hoverTimeout)
			}
		} else {
			close()
		}
	}, [isHovered, dataLoaded, open, close, isSmallScreen])

	return (
		<Popover opened={opened} width={'350px'} position='top-start' withinPortal>
			<Popover.Target>
				<span
					onMouseEnter={() => {
						setIsHovered(true)
					}}
					onMouseLeave={() => setIsHovered(false)}>
					{children}
				</span>
			</Popover.Target>
			<Popover.Dropdown
				onMouseOver={open}
				sx={{
					zIndex: 1000,
					backgroundColor: dark ? 'black' : '#fffefe',
					borderRadius: '10px',
					border: 'none',
					boxShadow:
						'rgba(0, 0, 0, 0.05) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.05) 0px 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0px 0.75rem 0.75rem -0.4375rem',
				}}
				onMouseLeave={close}>
				{loading ? (
					<ShowUserDetailsLoading />
				) : (
					<>
						{userData && (
							<>
								<UserProfile username={userData.username} name={userData.name} image={userData.image} />
								<UserStats
									postLength={postLength}
									followersLength={userData.followers?.length || 0}
									followingLength={userData.following?.length || 0}
								/>
								{userData.private ? (
									userId && userData.followers?.includes(userId) ? (
										userPost && <UserPosts userPost={userPost} username={userData.username} />
									) : (
										<PrivateAccount />
									)
								) : (
									userPost && <UserPosts userPost={userPost} username={userData.username} />
								)}
								{userDetailsId == userId ? (
									<EditProfileButton />
								) : (
									userId && (
										<FollowButton
											isFollowed={isFollowed}
											setIsFollowed={setIsFollowed}
											userId={userId}
											userDetailsId={userDetailsId}
										/>
									)
								)}
							</>
						)}
					</>
				)}
			</Popover.Dropdown>
		</Popover>
	)
}

export default ShowUserDetails
