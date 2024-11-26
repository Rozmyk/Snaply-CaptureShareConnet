import { ReactNode } from 'react'

interface SidebarContainerProps {
	children: ReactNode
	narrowView: boolean
	dark: boolean
}

const SidebarContainer = ({ children, dark, narrowView }: SidebarContainerProps) => (
	<div style={{ width: narrowView ? 70 : 335, backgroundColor: dark ? 'black' : 'white' }}>{children}</div>
)
export default SidebarContainer
