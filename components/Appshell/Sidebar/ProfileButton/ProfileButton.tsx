import NavbarItemDesktop from '../NavbarItem/NavbarItemDesktop'
import NavbarItemTablet from '../NavbarItem/NavbarItemTablet'
import UserIcon from '../common/UserIcon/UserIcon'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
const ProfileButton = ({ variant }: { variant: string }) => {
	const router = useRouter()
	const session = useSession()
	const pathname = usePathname()
	const username = session.data?.user?.username
	const redirectToProfile = () => {
		if (username) {
			router.push(`/profile/${username.toLowerCase()}`)
		}
	}
	return (
		<>
			{variant === 'tablet' && (
				<NavbarItemTablet onClick={redirectToProfile} icon={UserIcon} label='Profile'></NavbarItemTablet>
			)}
			{variant === 'desktop' && (
				<NavbarItemDesktop
					onClick={redirectToProfile}
					active={pathname.startsWith('/profile')}
					icon={UserIcon}
					label='Profile'></NavbarItemDesktop>
			)}
		</>
	)
}

export default ProfileButton
