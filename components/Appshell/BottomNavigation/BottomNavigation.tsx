import { Box, ActionIcon, Avatar, useMantineColorScheme } from '@mantine/core'

import HomeButton from '../Sidebar/HomeButton/HomeButton'
import ExploreButton from '../Sidebar/common/ExploreButton/ExploreButton'
import SearchButton from '../Sidebar/common/SearchButton/SearchButton'
import MessageButton from '../Sidebar/common/MessageButton/MessageButton'
import ProfileButton from '../Sidebar/ProfileButton/ProfileButton'
import { useRouter } from 'next/navigation'
const BottomNavigation = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const router = useRouter()
	return (
		<Box
			sx={{
				width: '100%',
				height: '50px',
				display: 'flex',
				justifyContent: 'space-around',
				backgroundColor: dark ? 'black' : 'white',
				borderTop: `2px solid ${dark ? '#232323' : '#dedede'} `,
				alignItems: 'center',
			}}>
			<HomeButton variant='tablet' />
			<SearchButton
				onClick={() => {
					router.push('/explore')
				}}
				variant='tablet'
			/>
			<ExploreButton variant='tablet' />
			<MessageButton
				variant='tablet'
				onClick={() => {
					router.push('/direct')
				}}
			/>
			<ProfileButton variant='tablet' />
		</Box>
	)
}

export default BottomNavigation
