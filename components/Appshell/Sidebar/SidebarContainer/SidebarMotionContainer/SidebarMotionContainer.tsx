import { motion } from 'framer-motion'
import { Flex } from '@mantine/core'
import { ReactNode } from 'react'
interface SidebarMotionContainerProps {
	children: ReactNode
	isWindowOpen: boolean
	narrowView: boolean
	dark: boolean
}
const SidebarMotionContainer = ({ children, isWindowOpen, narrowView, dark }: SidebarMotionContainerProps) => {
	return (
		<motion.div
			initial={{ width: 335 }}
			animate={{ width: narrowView ? 70 : 335 }}
			transition={{ duration: 0.3 }}
			exit={{ opacity: 0, width: 0 }}
			style={{
				height: '100vh',
				backgroundColor: dark ? 'black' : 'white',
				position: 'relative',
				zIndex: 3,
				borderRight: isWindowOpen ? '' : `1px solid ${dark ? '#232323' : '#dedede'}`,
			}}>
			<Flex direction='column' align='center' p='sm' h='100%' w='100%'>
				{children}
			</Flex>
		</motion.div>
	)
}

export default SidebarMotionContainer
