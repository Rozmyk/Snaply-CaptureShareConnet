import { Avatar } from '@mantine/core'
import { useSession } from 'next-auth/react'
const UserIcon = () => {
	const session = useSession()
	const userPhoto = session?.data?.user?.image
	return <Avatar radius='50%' src={userPhoto} size='sm'></Avatar>
}

export default UserIcon
