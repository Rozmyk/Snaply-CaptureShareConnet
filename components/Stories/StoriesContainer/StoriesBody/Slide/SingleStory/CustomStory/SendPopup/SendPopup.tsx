import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Flex } from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'

interface SendPopupProps {
	setShowPopup: Dispatch<SetStateAction<boolean>>
	duration?: number
}

const SendPopup = ({ duration = 2000, setShowPopup }: SendPopupProps) => {
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false)
		}, duration)

		return () => clearTimeout(timer)
	}, [duration])

	return (
		<AnimatePresence onExitComplete={() => setShowPopup(false)}>
			{visible && (
				<Flex
					justify='center'
					align='center'
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						zIndex: 200000,
					}}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}>
						<div
							style={{
								backgroundColor: '#2a2727',
								color: 'white',
								padding: '15px 20px',
								opacity: 0.9,
								borderRadius: '5px',
								fontWeight: 500,
							}}>
							Sent
						</div>
					</motion.div>
				</Flex>
			)}
		</AnimatePresence>
	)
}

export default SendPopup
