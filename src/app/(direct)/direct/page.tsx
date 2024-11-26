import ResponsiveDirect from '../../../../components/Direct/ResponsiveDirect/ResponsiveDirect'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Inbox • Direct',
	description: 'Direct',
}
const direct = () => {
	return <ResponsiveDirect />
}

export default direct
