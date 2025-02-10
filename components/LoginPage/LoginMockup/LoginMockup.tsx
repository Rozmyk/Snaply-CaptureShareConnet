import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import firstMockup from '../../../public/firstMockup.webp'
import secondMockup from '../../../public/secondMockup.webp'

const LoginMockup = () => {
	const [currentMockup, setCurrentMockup] = useState(firstMockup)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentMockup(prevMockup => (prevMockup === firstMockup ? secondMockup : firstMockup))
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='relative w-[400px] h-auto'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentMockup.src}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className='absolute inset-0'>
					<Image alt='Snaply app on phone' width={400} src={currentMockup} />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default LoginMockup
