import { Text } from '@mantine/core'
import { Timestamp } from 'firebase-admin/firestore'
interface DateComponentProps {
	createdAt: Timestamp
}
function getTimeDifference(timestamp: Timestamp) {
	const currentDate = new Date()
	const commentDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)

	const sameDay =
		currentDate.getDate() === commentDate.getDate() &&
		currentDate.getMonth() === commentDate.getMonth() &&
		currentDate.getFullYear() === commentDate.getFullYear()

	if (sameDay) {
		const hours = commentDate.getHours().toString().padStart(2, '0')
		const minutes = commentDate.getMinutes().toString().padStart(2, '0')
		return `${hours}:${minutes}`
	} else {
		const day = commentDate.getDate().toString().padStart(2, '0')
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		const month = monthNames[commentDate.getMonth()]
		const year = commentDate.getFullYear()
		const hours = commentDate.getHours().toString().padStart(2, '0')
		const minutes = commentDate.getMinutes().toString().padStart(2, '0')
		return `${day} ${month} ${year}, ${hours}:${minutes}`
	}
}

const DateComponent = ({ createdAt }: DateComponentProps) => {
	return (
		<Text align='center' color={'#8A8D91'} fz={12} m='sm' fw={600}>
			{getTimeDifference(createdAt)}
		</Text>
	)
}

export default DateComponent
