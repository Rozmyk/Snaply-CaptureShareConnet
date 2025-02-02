import { ReactNode } from 'react'

interface SidebarContainerProps {
	children: ReactNode
	narrowView: boolean
	dark: boolean
	isTabletScreen: boolean
}

const SidebarContainer = ({ children, dark, narrowView, isTabletScreen }: SidebarContainerProps) => (
	<div style={{ width: isTabletScreen ? 70 : 335, backgroundColor: dark ? 'black' : 'white' }}>{children}</div>
)
export default SidebarContainer
