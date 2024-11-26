'use client'
import HighlightsContainer from '../../../../components/Stories/Highlights/HighlightsContainer/HighlightsContainer'
import { useSearchParams } from 'next/navigation'

export default function Page() {
	const searchParams = useSearchParams()

	const id = searchParams.get('id')

	return <HighlightsContainer highlightId={id} />
}
