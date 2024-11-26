import { Flex, Button, Transition, useMantineColorScheme, Portal, Box } from '@mantine/core'
interface NewPostsButtonProps {
	visible: boolean
	onClick: () => void
}
const NewPostsButton = ({ visible, onClick }: NewPostsButtonProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Portal>
			<Box
				sx={theme => ({
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					padding: theme.spacing.xs,

					zIndex: 1000000,

					transition: 'transform 400ms ease',
				})}>
				<Transition mounted={visible} transition='slide-down' duration={400} timingFunction='ease'>
					{styles => (
						<div style={styles}>
							<Flex justify='center' align='center' sx={{ position: 'sticky', top: '25px', zIndex: 1000 }}>
								<Button
									style={{
										backgroundColor: dark ? '#0b1518' : '#fefffe',
										color: dark ? 'white' : 'black',
									}}
									radius='xl'
									onClick={onClick}>
									New Posts
								</Button>
							</Flex>
						</div>
					)}
				</Transition>
			</Box>
		</Portal>
	)
}

export default NewPostsButton
