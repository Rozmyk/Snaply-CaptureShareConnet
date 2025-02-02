'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoginContainer from '../../../components/LoginPage/LoginContainer/LoginContainer'

const Login = () => {
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

	return <LoginContainer />
}

export default Login
