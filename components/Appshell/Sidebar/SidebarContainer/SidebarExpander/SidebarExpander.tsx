import { AnimatePresence, motion } from 'framer-motion'
import { Box } from '@mantine/core'
import NotificationsContent from '../../../../Notifications/NotificationsContent/NotificationsContent'
import SearchContentContainer from './SearchContentContainer/SearchContentContainer'
import { Dispatch, SetStateAction } from 'react'
interface SidebarExpanderProps {
	isWindowOpen: boolean
	expanderActiveContent: string
	dark: boolean
	setIsWindowOpen: Dispatch<SetStateAction<boolean>>
	scrollAreaHeight: number
}
const SidebarExpander = ({
	isWindowOpen,
	expanderActiveContent,
	dark,
	scrollAreaHeight,
	setIsWindowOpen,
}: SidebarExpanderProps) => {
	return (
		<AnimatePresence>
			{isWindowOpen && (
				<motion.div
					key='notifications'
					initial='hidden'
					animate='visible'
					exit='hidden'
					variants={{
						hidden: { x: -400, overflow: 'hidden' },
						visible: { x: 0, overflow: 'hidden' },
					}}
					transition={{
						type: 'spring',
						stiffness: 260,
						damping: 20,
						duration: 0.3,
					}}
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 70,
						width: 400,
						height: '100%',
						borderTopRightRadius: '10px',
						backgroundColor: dark ? 'black' : 'white',
						zIndex: 2,
						borderBottomRightRadius: '10px',
						borderRight: `1px solid ${dark ? '#232323' : '#dedede'} `,
					}}>
					{expanderActiveContent === 'notifications' && (
						<Box sx={{ flexGrow: 1, height: '100%' }}>
							<NotificationsContent withText areaHeight={scrollAreaHeight} />
						</Box>
					)}
					{expanderActiveContent === 'search' && (
						<Box sx={{ flexGrow: 1, height: '100%' }}>
							<SearchContentContainer opened={isWindowOpen} setOpened={setIsWindowOpen} />
						</Box>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default SidebarExpander
