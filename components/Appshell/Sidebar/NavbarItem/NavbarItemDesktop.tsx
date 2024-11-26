import { Text, useMantineColorScheme, Box } from '@mantine/core'
import { useHover } from '@mantine/hooks'

import React from 'react'

interface NavbarItemDesktopProps {
	active?: boolean
	onClick?: () => void
	label: string
	pathname?: string
	icon?: React.ElementType | undefined
}

const NavbarItemDesktop = ({ active, onClick, label, icon: Icon }: NavbarItemDesktopProps) => {
	const { hovered, ref } = useHover()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<div ref={ref} style={{ width: '100%' }}>
			<Box
				onClick={onClick}
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: '0.5rem 0.75rem',
					gap: 10,
					borderRadius: '10px',
					transition: 'all 0.3s ease',
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: dark ? '#1b1a1b' : '#f2f3f3',
					},
				}}>
				<div style={{ transform: hovered ? 'scale(1.1)' : 'scale(1.0)', transition: '0.2s' }}>
					{Icon && <Icon size={28} stroke={1.75} style={{ color: dark ? 'white' : 'black' }} />}
				</div>
				<Text fz='md' color={dark ? 'white' : 'black'} fw={active ? 700 : 400}>
					{label}
				</Text>
			</Box>
		</div>
	)
}

export default NavbarItemDesktop
