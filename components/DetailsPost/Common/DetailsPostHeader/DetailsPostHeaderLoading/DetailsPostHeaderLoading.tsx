import { Grid, Flex, Skeleton, Box } from '@mantine/core'
const DetailsPostHeaderLoading = () => {
	return (
		<Box w='100%' h={70} sx={{ borderBottom: '1px solid #232323' }}>
			<Grid justify='center' align='center' h='100%' w='100%' sx={{ padding: 0, margin: 0 }}>
				<Grid.Col span={2}>
					<Flex justify='center' align='center'>
						<Skeleton radius='50%' h={40} w={40}></Skeleton>
					</Flex>
				</Grid.Col>
				<Grid.Col span={8} m={0} p={0}>
					<Flex justify='flex-start' align='center'>
						<Skeleton width='30%' h={8}></Skeleton>
					</Flex>
				</Grid.Col>
				<Grid.Col span={2}>
					<Flex justify='center' align='center'>
						<Skeleton h={6} width={20}></Skeleton>
					</Flex>
				</Grid.Col>
			</Grid>
		</Box>
	)
}

export default DetailsPostHeaderLoading
