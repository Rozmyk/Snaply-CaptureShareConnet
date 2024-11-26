import { Skeleton, Group, Box, Flex } from '@mantine/core'
const DetailsActionLoading = () => {
	return (
		<Box h={150} w={'100%'} p='sm' sx={{ borderTop: '1px solid #232323' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Group spacing='xs'>
					<Skeleton w={30} h={30} radius='50%' /> <Skeleton w={30} h={30} radius='50%' />
					<Skeleton w={30} h={30} radius='50%' />
				</Group>
				<Skeleton w={30} h={30} radius='50%' />
			</Box>
			<Flex direction='column' mt='sm' mb='sm'>
				<Skeleton h={8} width={50} mb='xs' />

				<Skeleton h={6} width={35} />
			</Flex>

			<Box>
				<Flex justify='space-between' align='center' gap='10px'>
					<Skeleton w={30} h={30} radius='50%' />
					<Skeleton h={20} width='80%' />
				</Flex>
			</Box>
		</Box>
	)
}

export default DetailsActionLoading
