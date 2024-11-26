'use client'
import { useEffect, useState } from 'react'
import DirectPageContainer from '../../../../../components/Direct/DirectPageContainer/DirectPageContainer'
import { useMediaQuery } from '@mantine/hooks'
import DetailedSection from '../../../../../components/Direct/DirectPageContainer/DetailedSection/DetailedSection'
import DirectMobile from '../../../../../components/Direct/DirectMobile/DirectMobile'
import { Metadata } from 'next'
// export const metadata: Metadata = {
// 	title: 'Snaply • Direct',
// 	description: 'Direct',
// }
export default function Page({ params }: { params: { chatId: string } }) {
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return params.chatId && isSmallScreen ? (
		<DirectMobile chatId={params.chatId} />
	) : (
		<DirectPageContainer chatId={params.chatId} />
	)
}
