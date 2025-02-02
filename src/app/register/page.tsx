'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import RegisterContainer from '../../../components/RegisterPage/RegisterContainer/RegisterContainer'
import Footer from '../../../components/Footer/Footer'

const RegisterPage = () => {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)

		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status, router])

	if (!isClient || status === 'loading' || status === 'authenticated') {
		return null
	}

	return (
		<>
			<RegisterContainer />
			<Footer />
		</>
	)
}

export default RegisterPage
