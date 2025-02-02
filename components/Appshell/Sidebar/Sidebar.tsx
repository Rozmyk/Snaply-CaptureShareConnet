'use client'
import { Flex, useMantineColorScheme } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import { useClickOutside } from '@mantine/hooks'
import { usePathname } from 'next/navigation'
import { useViewportSize, useElementSize } from '@mantine/hooks'
import SidebarContainer from './SidebarContainer/SidebarContainer'
import SidebarHeader from './SidebarContainer/SidebarHeader/SidebarHeader'
import SidebarButtons from './SidebarContainer/SidebarButtons/SidebarButton'
import SidebarExpander from './SidebarContainer/SidebarExpander/SidebarExpander'
import SidebarMotionContainer from './SidebarContainer/SidebarMotionContainer/SidebarMotionContainer'

const Sidebar = () => {
	const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false)
	const [narrowView, setNarrowView] = useState<boolean>(true)
	const [notificationsOpened, setNotificationsOpened] = useState<boolean>(false)
	const [searchContentOpened, setSearchContentOpened] = useState<boolean>(false)
	const [expanderActiveContent, setExpanderActiveContent] = useState<string>('')
	const ref = useClickOutside(() => {
		setIsWindowOpen(false)
		setExpanderActiveContent('')
	})
	const variant = narrowView ? 'tablet' : 'desktop'
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { width } = useViewportSize()
	const isTabletScreen = width < 1300
	const { ref: scrollAreaRef, height: scrollAreaHeight } = useElementSize()

	const pathname = usePathname()

	const shouldSidebarBeExpanded = useCallback(() => {
		return pathname.startsWith('/explore') || pathname === '/'
	}, [pathname])

	useEffect(() => {
		if (isTabletScreen || !shouldSidebarBeExpanded() || notificationsOpened || searchContentOpened) {
			setNarrowView(true)
		} else {
			setNarrowView(false)
		}
	}, [
		notificationsOpened,
		searchContentOpened,
		pathname,
		isTabletScreen,
		expanderActiveContent,
		shouldSidebarBeExpanded,
		isWindowOpen,
	])

	useEffect(() => {
		setSearchContentOpened(expanderActiveContent === 'search')
		setNotificationsOpened(expanderActiveContent === 'notifications')
	}, [expanderActiveContent, narrowView])

	return (
		<SidebarContainer dark={dark} isTabletScreen={isTabletScreen}>
			<Flex ref={scrollAreaRef} sx={{ position: 'fixed', bottom: 0, left: 0, zIndex: 199 }}>
				<SidebarMotionContainer isWindowOpen={isWindowOpen} narrowView={narrowView} dark={dark}>
					<SidebarHeader narrowView={narrowView} dark={dark} />
					<SidebarButtons
						expanderActiveContent={expanderActiveContent}
						variant={variant}
						isWindowOpen={isWindowOpen}
						setIsWindowOpen={setIsWindowOpen}
						setExpanderActiveContent={setExpanderActiveContent}
					/>
				</SidebarMotionContainer>
				<div ref={ref}>
					<SidebarExpander
						isWindowOpen={isWindowOpen}
						expanderActiveContent={expanderActiveContent}
						dark={dark}
						scrollAreaHeight={scrollAreaHeight}
						setIsWindowOpen={setIsWindowOpen}
					/>
				</div>
			</Flex>
		</SidebarContainer>
	)
}

export default Sidebar
