'use client'
import { IconBrandTelegram } from '@tabler/icons-react'
import { useMantineColorScheme } from '@mantine/core'
const MessageIcon = () => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return <IconBrandTelegram stroke={1.75} color={!dark ? 'black' : 'white'} size={28} />
}

export default MessageIcon
