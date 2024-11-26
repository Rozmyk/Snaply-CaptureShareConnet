import { IconCompass } from '@tabler/icons-react'
import NavbarItemDesktop from '../../NavbarItem/NavbarItemDesktop'
import NavbarItemTablet from '../../NavbarItem/NavbarItemTablet'
import { useRouter, usePathname } from 'next/navigation'
const ExploreButton = ({ variant }: { variant: string }) => {
	const router = useRouter()
	const pathname = usePathname()
	const redirectToExplore = () => {
		router.push('/explore')
	}
	return (
		<>
			{variant === 'tablet' && <NavbarItemTablet onClick={redirectToExplore} label='Explore' icon={IconCompass} />}
			{variant === 'desktop' && (
				<NavbarItemDesktop
					active={pathname.startsWith('/explore')}
					onClick={redirectToExplore}
					label='Explore'
					icon={IconCompass}
				/>
			)}
		</>
	)
}

export default ExploreButton
