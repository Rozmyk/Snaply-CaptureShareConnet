'use client'
import { Anchor, Modal, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import UserCard from '../UserCard/UserCard'
import UserCardLoading from '../UserCard/UserCardLoading/UserCardLoading'
import { fetchUserData } from '../../utils/user/fetchUserData'
import ModalHeader from '../Appshell/commonComponents/CreatePostModal/ModalHeader/ModalHeader'
import { useEffect, useState } from 'react'
import { UserProps } from '../../types'

interface LikesProps {
	likes: string[]
	size?: number | string
	fontWeight?: string | number
	isGray: boolean
}

const Likes = ({ likes, size, fontWeight, isGray }: LikesProps) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [postLikesData, setPostLikesData] = useState<UserProps[] | undefined>([])
	const [opened, { open, close }] = useDisclosure(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const sizeToApply = size || 'sm'
	const fontWeightToApply = fontWeight || 600

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const updatedData: UserProps[] = []

				for (const like of likes) {
					try {
						const userData: UserProps | undefined = await fetchUserData(like)
						if (userData) {
							updatedData.push(userData)
						} else {
							console.warn(`User data for like ${like} is undefined or invalid.`)
						}
					} catch (error) {
						console.error(`Error fetching user data for like ${like}:`, error)
					}
				}

				setPostLikesData(updatedData)
				setLoading(false)
			} catch (error) {
				console.error('Error while fetching data:', error)
				setLoading(false)
			}
		}
		fetchData()
	}, [likes])

	return (
		<>
			<Modal.Root centered opened={opened} onClose={close} radius='md'>
				<Modal.Overlay />
				<Modal.Content>
					<ModalHeader closeButton closeButtonAction={close} centerText='Likes' />
					<Modal.Body>
						{loading ? <UserCardLoading /> : postLikesData?.map(user => <UserCard key={user.id} {...user}></UserCard>)}
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<Anchor
				color={isGray ? (dark ? '#a8a8a8' : '#737373') : dark ? 'white' : 'black'}
				fw={fontWeightToApply}
				fz={sizeToApply}
				component='button'
				type='button'
				onClick={likes.length > 0 ? open : undefined}>
				{likes && likes.length > 0 ? likes.length : 0} likes
			</Anchor>
		</>
	)
}

export default Likes
