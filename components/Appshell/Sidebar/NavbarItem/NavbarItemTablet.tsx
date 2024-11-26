import { Tooltip, rem, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { useHover } from '@mantine/hooks'

interface NavbarItemTabletProps {
	onClick?: () => void
	label: string
	icon?: React.ElementType
}
const NavbarItemTablet = ({ icon: Icon, label, onClick }: NavbarItemTabletProps) => {
	const { hovered, ref } = useHover()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Tooltip zIndex={1000} label={label} position='right' transitionProps={{ duration: 0 }}>
			<div ref={ref}>
				<ActionIcon
					sx={{
						width: rem(48),
						height: rem(48),
						borderRadius: '8px',
						'&:hover': {
							backgroundColor: dark ? '#1b1a1b' : '#f2f3f3',
						},
					}}
					onClick={onClick}>
					<div style={{ transform: hovered ? 'scale(1.05)' : 'scale(1.0)', transition: '0.2s' }}>
						{Icon && <Icon size={28} stroke={1.75} color={!dark ? 'black' : 'white'} />}
					</div>
				</ActionIcon>
			</div>
		</Tooltip>
	)
}

export default NavbarItemTablet
