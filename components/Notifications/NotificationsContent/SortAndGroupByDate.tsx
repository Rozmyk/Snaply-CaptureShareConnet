import { updatedNotificationsProps } from '../../../types'

type GroupedNotifications = {
	today: updatedNotificationsProps[]
	yesterday: updatedNotificationsProps[]
	thisWeek: updatedNotificationsProps[]
	thisMonth: updatedNotificationsProps[]
	thisYear: updatedNotificationsProps[]
	older: updatedNotificationsProps[]
}

const sortAndGroupByDate = (data: updatedNotificationsProps[]): GroupedNotifications => {
	const sortedData = [...data].sort(
		(a, b) => new Date(b.createdAt.toMillis()).getTime() - new Date(a.createdAt.toMillis()).getTime()
	)
	const currentDate = new Date()
	const yesterday = new Date(currentDate)
	yesterday.setDate(currentDate.getDate() - 1)

	return sortedData.reduce<GroupedNotifications>(
		(result, item) => {
			const itemDate = new Date(item.createdAt.toMillis())

			if (itemDate.toDateString() === currentDate.toDateString()) {
				result.today.push(item)
			} else if (itemDate.toDateString() === yesterday.toDateString()) {
				result.yesterday.push(item)
			} else if (itemDate > new Date(currentDate.getTime() - 7 * 86400000)) {
				result.thisWeek.push(item)
			} else if (
				itemDate.getMonth() === currentDate.getMonth() &&
				itemDate.getFullYear() === currentDate.getFullYear()
			) {
				result.thisMonth.push(item)
			} else if (itemDate.getFullYear() === currentDate.getFullYear()) {
				result.thisYear.push(item)
			} else {
				result.older.push(item)
			}

			return result
		},
		{
			today: [],
			yesterday: [],
			thisWeek: [],
			thisMonth: [],
			thisYear: [],
			older: [],
		}
	)
}

export default sortAndGroupByDate
