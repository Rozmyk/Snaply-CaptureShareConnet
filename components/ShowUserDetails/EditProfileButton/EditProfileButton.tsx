import CustomButton from '../../CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
const EditProfileButton = () => {
	const router = useRouter()
	const session = useSession()
	const username = session?.data?.user?.username
	const handleRedirect = () => {
		router.push(`/profile/${username}`)
	}
	return (
		<CustomButton onClick={handleRedirect} fullWidth>
			Edit profile
		</CustomButton>
	)
}

export default EditProfileButton
