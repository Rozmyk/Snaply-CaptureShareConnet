import { IconHome } from '@tabler/icons-react'
import NavbarItemDesktop from '../NavbarItem/NavbarItemDesktop'
import NavbarItemTablet from '../NavbarItem/NavbarItemTablet'
import { useRouter, usePathname } from 'next/navigation'

const HomeButton = ({ variant }: { variant: string }) => {
	const router = useRouter()
	const pathname = usePathname()
	const redirectToHome = () => {
		router.push('/')
	}
	return (
		<>
			{variant === 'tablet' && <NavbarItemTablet onClick={redirectToHome} label='Home' icon={IconHome} />}
			{variant === 'desktop' && (
				<NavbarItemDesktop active={pathname == '/'} label='Home' onClick={redirectToHome} icon={IconHome} />
			)}
		</>
	)
}

export default HomeButton
