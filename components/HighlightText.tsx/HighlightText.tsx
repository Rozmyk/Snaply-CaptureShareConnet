import { useState, useEffect } from 'react'
import { useMantineColorScheme } from '@mantine/core'
import ShowUserDetails from '../ShowUserDetails/ShowUserDetails'
import { UserProps } from '../../types'
import { fetchUserData } from '../../utils/user/fetchUserData'
import Link from 'next/link'
interface HighlightTextProps {
	text: string
	mentionedTags: string[] | null
	mentionedUsers: string[] | null
}

const HighlightText = ({ text, mentionedTags, mentionedUsers }: HighlightTextProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const [updatedUsers, setUpdatedUsers] = useState<UserProps[] | undefined>(undefined)
	const [usersLoading, setUsersLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			if (mentionedUsers && mentionedUsers.length > 0) {
				try {
					const fetchedData: UserProps[] = []
					for (const username of mentionedUsers) {
						const userData = await fetchUserData(username)
						if (userData) {
							fetchedData.push(userData)
						} else {
							console.warn(`User data for ${username} is undefined or invalid.`)
						}
					}

					setUpdatedUsers(fetchedData)
					setUsersLoading(false)
				} catch (error) {
					console.error('Error fetching user data:', error)
					setUsersLoading(true)
				}
			} else {
				setUsersLoading(false)
			}
		}

		fetchData()
	}, [mentionedUsers])

	const highlightText = (text: string) => {
		const words = text.split(/\s+/)

		return words.map((word: string, index: number) => {
			if (mentionedTags && mentionedTags.includes(word)) {
				return (
					<Link
						key={index}
						href={`/explore/tags/${word.substring(1).toLowerCase()}`}
						style={{ color: dark ? '#e0f1ff' : '#00376B', textDecoration: 'none', padding: 0, margin: 0 }}>
						{word + ' '}
					</Link>
				)
			}

			if (!usersLoading && updatedUsers && updatedUsers.length > 0) {
				const mentionedUser = updatedUsers.find(user => user && user.username && '@' + user.username === word)
				if (mentionedUser) {
					return (
						<ShowUserDetails key={mentionedUser.id} userDetailsId={mentionedUser.id}>
							<Link
								href={`/profile/${mentionedUser.username}`}
								style={{ color: dark ? '#e0f1ff' : '#00376B', textDecoration: 'none', padding: 0, margin: 0 }}>
								{word + ' '}
							</Link>
						</ShowUserDetails>
					)
				}
			}

			return word + ' '
		})
	}

	return <div style={{ color: dark ? 'white' : 'black' }}>{highlightText(text)}</div>
}

export default HighlightText
