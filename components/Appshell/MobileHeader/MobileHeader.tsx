import { usePathname } from 'next/navigation'
import { Header, useMantineColorScheme } from '@mantine/core'
import HomeHeader from './HomeHeader/HomeHeader'
import NotificationsHeader from './NotificationsHeader/NotificationsHeader'
import ExploreHeader from './ExploreHeader/ExploreHeader'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import PostHeader from './PostHeader/PostHeader'

const MobileHeader = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const pathname = usePathname()
	let header

	if (pathname === '/') {
		header = <HomeHeader />
	} else if (pathname === '/notifications') {
		header = <NotificationsHeader />
	} else if (pathname === '/explore') {
		header = <ExploreHeader />
	} else if (pathname.startsWith('/profile')) {
		header = <ProfileHeader />
	} else if (pathname.startsWith('/post/') && pathname.endsWith('/comments')) {
		header = <PostHeader />
	} else {
		header = ''
	}

	return (
		header !== '' && (
			<Header
				height={45}
				sx={{
					backgroundColor: dark ? 'black' : 'white',
					borderBottom: `2px solid ${dark ? '#232323' : '#dedede'} `,
					color: dark ? 'white' : 'black',
				}}>
				{header}
			</Header>
		)
	)
}

export default MobileHeader
