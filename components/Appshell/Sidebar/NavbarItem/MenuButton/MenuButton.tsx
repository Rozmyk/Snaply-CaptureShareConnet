import { Menu, Divider, useMantineColorScheme } from '@mantine/core'
import { IconSettings, IconBaselineDensityMedium, IconBookmark, IconSun, IconMoonStars } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import NavbarItemDesktop from '../NavbarItemDesktop'
import NavbarItemTablet from '../NavbarItemTablet'
interface MenuButtonProps {
	variant: string
}
function MenuButton({ variant }: MenuButtonProps) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const handleLogout = async () => {
		signOut()
	}

	return (
		<Menu shadow='md' width={300} position='top-start'>
			<Menu.Target>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{variant === 'tablet' && <NavbarItemTablet label='More' icon={IconBaselineDensityMedium} />}
					{variant === 'desktop' && <NavbarItemDesktop label='More' icon={IconBaselineDensityMedium} />}
				</div>
			</Menu.Target>

			<Menu.Dropdown
				p='xs'
				sx={{
					backgroundColor: dark ? '#262626' : '#fffefe',
					border: 'none',
					color: dark ? 'white' : 'black',
					'.mantine-Menu-item': {
						color: dark ? 'white' : 'black',
						padding: 16,
						fontSize: 14,
						'&:hover': {
							backgroundColor: dark ? '#3d3d3c' : '#f3f3f2',
						},
						'&:disabled': {
							color: dark ? '#a8a8a8' : '#737373',
						},
					},
				}}>
				<Menu.Item disabled icon={<IconSettings size={18} />}>
					Settings
				</Menu.Item>

				<Menu.Item disabled icon={<IconBookmark size={18} />}>
					Saved
				</Menu.Item>
				<Menu.Item
					onClick={() => toggleColorScheme()}
					icon={dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}>
					Switch appearance
				</Menu.Item>

				<Menu.Label sx={{ padding: 0, margin: 0 }}>
					<Divider
						m={0}
						mb='xs'
						mt='xs'
						p={0}
						w={'100%'}
						sx={{ borderRadius: '10px' }}
						size='lg'
						color={dark ? '#343435' : '#f4f5f5'}
					/>
				</Menu.Label>
				<Menu.Item disabled>Switch account</Menu.Item>
				<Divider
					m={0}
					mb='xs'
					mt='xs'
					p={0}
					w={'100%'}
					sx={{ borderRadius: '10px' }}
					size='xs'
					color={dark ? '#343435' : '#f4f5f5'}
				/>
				<Menu.Item onClick={handleLogout}>
					<div>Log out</div>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
export default MenuButton
