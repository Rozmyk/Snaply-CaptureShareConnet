'use client'
import { useSearchParams } from 'next/navigation'
import ErrorPage from '../../../components/ErrorPage/ErrorPage'
import StoriesContainer from '../../../components/Stories/StoriesContainer/StoriesContainer'

export default function Page() {
	const searchParams = useSearchParams()

	const username = searchParams.get('username')

	return !username ? <ErrorPage /> : <StoriesContainer username={username} />
}
