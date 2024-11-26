import { IconLock as IconLockIcon } from '@tabler/icons-react'
import { Flex } from '@mantine/core'

const IconLock = () => {
	return (
		<Flex
			justify='center'
			align='center'
			sx={{ borderRadius: '50%', border: '2px solid #262727', width: 96, height: 96 }}>
			<IconLockIcon style={{ color: '#262727' }} stroke={1} size={60} />
		</Flex>
	)
}

export default IconLock
