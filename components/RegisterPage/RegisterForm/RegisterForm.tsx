'use client'
import { signIn } from 'next-auth/react'
import { useForm } from '@mantine/form'
import { Box, Text, Stack, TextInput, PasswordInput } from '@mantine/core'
import CustomButton from '../../CustomButton/CustomButton'
import { useState } from 'react'
import { createUser } from '../../../utils/user/createUser'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { query, collection, getDocs } from 'firebase/firestore'
import { auth } from '../../../src/app/firebase'
import { db } from '../../../src/app/firebase'
import setUpErrorMessage from '../../../utils/errorUtils'
const RegisterForm = () => {
	const [errorText, setErrorText] = useState('')
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			username: '',
			password: '',
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			name: value => {
				if (value.length === 0) {
					return 'Name cannot be empty'
				} else if (value.length > 25) {
					return 'Name must be less than or equal to 25 characters'
				} else {
					return null
				}
			},

			username: value => {
				if (value.length < 4) {
					return 'Username must be at least 4 characters'
				} else if (value.indexOf(' ') !== -1) {
					return 'Username cannot contain spaces'
				} else if (/^[a-zA-Z0-9]+$/.test(value)) {
					return null
				} else {
					return 'Username can only contain letters and numbers'
				}
			},

			password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
		},
	})
	const checkUsernameAvailability = async () => {
		const usernameLowercase = form.values.username.toLowerCase()

		const q = query(collection(db, 'users'))
		const querySnapshot = await getDocs(q)
		const existingUsernames = querySnapshot.docs.map(doc => doc.data().username?.toLowerCase()).filter(Boolean)

		const isUsernameTaken = existingUsernames.some(existingUsername => existingUsername === usernameLowercase)
		return isUsernameTaken
	}
	const createNewUser = async () => {
		const email = form.values.email
		const password = form.values.password
		const username = form.values.username
		const name = form.values.name
		let user = {
			id: '',
			image: '',
			username: username,
			name: name,
			completed: true,
			description: '',
			descriptionLink: '',
			email: email,
			followers: [],
			following: [],
			private: false,
			savedPosts: null,
			savedStories: null,
		}

		const isUsernameTaken = await checkUsernameAvailability()

		if (!isUsernameTaken) {
			try {
				await createUserWithEmailAndPassword(auth, email, password).then(res => {
					{
						user.id = res.user.uid
					}
				})
				createUser(user)

				await signIn('credentials', {
					email: email,
					password: password,
					redirect: true,
					callbackUrl: '/',
				})
			} catch (error) {
				let errorMessage

				if (typeof error === 'string') {
					errorMessage = error
				} else if (error instanceof Error) {
					errorMessage = error.message
				} else {
					errorMessage = 'Unexpected error occurred'
				}

				setErrorText(setUpErrorMessage(errorMessage))
			}
		} else {
			setErrorText("This username isn't available. Please try another.")
		}
	}
	const inputStyle = {
		'.mantine-TextInput-input': {
			backgroundColor: '#fbfbfa',
		},
	}
	return (
		<form
			onSubmit={form.onSubmit(() => {
				createNewUser()
			})}>
			<Box>
				<Stack spacing='xs' mb='sm'>
					<TextInput sx={inputStyle} {...form.getInputProps('email')} placeholder='Email'></TextInput>
					<TextInput sx={inputStyle} {...form.getInputProps('name')} placeholder='Full Name'></TextInput>
					<TextInput sx={inputStyle} {...form.getInputProps('username')} placeholder='Username'></TextInput>
					<PasswordInput
						sx={{
							'.mantine-PasswordInput-input': {
								backgroundColor: '#fbfbfa',
							},
						}}
						{...form.getInputProps('password')}
						placeholder='Password'></PasswordInput>
				</Stack>
				<Text align='center' fz='xs' c='dimmed' mb='md'>
					People who use our service may have uploaded your contact information to Snaply. Learn More
				</Text>
				<Text align='center' fz='xs' c='dimmed' mb='sm'>
					By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Privacy Policy and
					how we use cookies and similar technology in our Cookies Policy.
				</Text>
				<CustomButton
					submitType
					disabled={
						form.values.email == '' ||
						form.values.username == '' ||
						form.values.password == '' ||
						form.values.username.trim() == ''
					}
					fullWidth>
					Next
				</CustomButton>
				{errorText !== '' && (
					<Text m='xl' fz='sm' align='center' color='#ED4956'>
						{errorText}
					</Text>
				)}

				<Text mt='lg' align='center' fz='xs' c='dimmed'>
					You can also report content you believe is unlawful in your country without logging in.
				</Text>
			</Box>
		</form>
	)
}

export default RegisterForm
