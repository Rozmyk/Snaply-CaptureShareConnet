'use client'
import { Tabs, useMantineColorScheme } from '@mantine/core'
import ProfileTabList from './ProfileTabList/ProfileTabList'
import ProfileTabPanel from './ProfileTabPanel/ProfileTabPanel'
interface ProfileTabsInterface {
	userId: string
	savedPostIds: string[]
	isCurrentUser: boolean
}
const ProfileTabs = ({ userId, savedPostIds, isCurrentUser }: ProfileTabsInterface) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Tabs
			mt='xs'
			defaultValue='posts'
			inverted
			sx={{
				'.mantine-Tabs-tabsList': {
					borderWidth: '1px',
				},
				'.mantine-Tabs-tab': {
					borderColor: 'none',
					borderWidth: '2px',
					color: dark ? '#a9a9a8' : '#727372',
					padding: '15px 10px',
					fontSize: 12,
					'&:hover': {
						borderColor: 'none',
					},
				},
				'.mantine-Tabs-tab[data-active]': {
					borderColor: dark ? '#f4f5f4' : '#000101',
					color: dark ? '#f4f5f4' : '#000101',
					'&:hover': { borderColor: dark ? '#f4f5f4' : '#000101', color: dark ? '#f4f5f4' : '#000101' },
				},
				'.mantine-Tabs-tabLabel': {
					fontWeight: 600,
					textTransform: 'uppercase',
				},
			}}>
			<ProfileTabList isCurrentUser={isCurrentUser} />
			<ProfileTabPanel userId={userId} savedPostIds={savedPostIds} isCurrentUser={isCurrentUser} />
		</Tabs>
	)
}

export default ProfileTabs
