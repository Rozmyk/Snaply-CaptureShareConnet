import { ReactNode } from 'react'

interface SidebarContainerProps {
	children: ReactNode
	dark: boolean
	shouldSidebarBeExpanded: () => boolean
}

const SidebarContainer = ({ children, dark, shouldSidebarBeExpanded }: SidebarContainerProps) => (
	<div
		style={{
			width: shouldSidebarBeExpanded() ? 335 : 0,
			backgroundColor: dark ? 'black' : 'white',
		}}>
		{children}
	</div>
)
export default SidebarContainer
