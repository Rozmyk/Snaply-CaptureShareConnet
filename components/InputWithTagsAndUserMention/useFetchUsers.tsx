import { useState, useEffect } from 'react'
import { getAllUsers } from '../../utils/getAllUsers'

type updatedUsersProps = {
	id: string
	image: string
	name: string
	display: string
}
const useFetchUsers = () => {
	const [users, setUsers] = useState<updatedUsersProps[]>([])
	const [userLoading, setUserLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const newUsers: updatedUsersProps[] = []
				const fetchedUsers = await getAllUsers()
				fetchedUsers.forEach(user => {
					const newUser = {
						display: user.username,
						id: user.id,
						image: user.image,
						name: user.name,
					}
					newUsers.push(newUser)
				})
				setUsers(newUsers)
				setUserLoading(false)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUsers()
	}, [])

	return { users, userLoading }
}

export default useFetchUsers
