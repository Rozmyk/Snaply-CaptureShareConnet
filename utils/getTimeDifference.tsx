import { Timestamp } from 'firebase-admin/firestore'

function getTimeDifference(timestamp: Timestamp) {
	const currentDate = new Date()
	const commentDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)

	const diffInMilliseconds = currentDate.getTime() - commentDate.getTime()
	const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

	if (diffInDays === 0) {
		const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
		if (diffInHours === 0) {
			const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
			if (diffInMinutes === 0) {
				return ' just now'
			}
			return ` ${diffInMinutes}m`
		}
		return ` ${diffInHours}h`
	} else if (diffInDays === 1) {
		return ' yesterday'
	} else if (diffInDays < 31) {
		return ` ${diffInDays}d `
	}

	const diffInMonths =
		(currentDate.getFullYear() - commentDate.getFullYear()) * 12 + (currentDate.getMonth() - commentDate.getMonth())
	return ` ${diffInMonths} ${
		diffInMonths === 1 ? 'month' : diffInMonths >= 2 && diffInMonths <= 4 ? 'months' : 'months'
	} ago`
}

export default getTimeDifference
