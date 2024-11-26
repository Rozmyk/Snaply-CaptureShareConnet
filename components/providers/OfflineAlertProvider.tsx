'use client'
import { useNetwork } from '@mantine/hooks'
import NoInternetConnection from '../NoInternetConnection/NoInternetConnection'
import { ReactNode } from 'react'
interface OfflineAlertProviderProps {
	children: ReactNode
}
const OfflineAlertProvider = ({ children }: OfflineAlertProviderProps) => {
	const networkStatus = useNetwork()

	return networkStatus.online ? children : <NoInternetConnection />
}

export default OfflineAlertProvider
