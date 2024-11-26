import { Timestamp } from 'firebase-admin/firestore'

export interface UserProps {
	id: string
	image: string
	username: string
	name: string
	completed: boolean
	description: string
	descriptionLink: string
	email: string
	followers: string[]
	following: string[]
	private: boolean
	savedPosts: string[] | null
	savedStories: string[] | null
}
export interface notificationProps {
	addedBy: string
	userId: string
	type: 'likePost' | 'followUser' | 'requestFollow' | 'commentedYourPost' | 'mentionedInComment' | 'repliedToComment'
	createdAt: Timestamp
	options: {
		post: {
			postId: string
			postImage: string
		}
		content: string
	}
	viewed: boolean
}
export interface updatedNotificationsProps extends notificationProps {
	id: string
	user: UserProps
}

export interface ReplyDataProps {
	isReplyToMessage: boolean
	content: string
	messageType: string
	sender: string
	messageId: string
	attachments: string | null
	id?: string
	username: string
}
export interface ReplyToPost {
	isReplied: boolean
	postId: string
	commentId: string
	replyUserId: string
	replyUsername: string
}

export interface DownloadTagProps {
	display: string
	postLength: number
	id: string
}

export interface UploadCommentRepliesProps {
	createdAt: Timestamp
	mentionedTags: string[]
	mentionedUsers: string[]
	text: string
	user: string
}
export interface DownloadCommentRepliesProps {
	createdAt: Timestamp
	mentionedTags: string[]
	mentionedUsers: string[]
	text: string
	user: string
	userDetails: UserProps
	likes?: string[]
	id: string
}

export interface UploadCommentProps {
	createdAt: Timestamp
	mentionedTags: string[]
	mentionedUsers: string[]
	text: string
	user: string
}
export interface DownloadCommentProps {
	id: string
	createdAt: Timestamp
	text: string
	user: string
	userDetails: UserProps
	replies: DownloadCommentRepliesProps[]
}

export interface SingleDownloadedCommentProps {
	createdAt: Timestamp
	likes: string[]
	text: string
	id: string
	mentionedTags: string[]
	mentionedUsers: string[]
	userDetails: UserProps
	user: string
	replies?: DownloadCommentRepliesProps[]
}
export interface SinglePostProps {
	addedBy: string
	alt: string
	caption: string
	createdAt: Timestamp
	hideLikes: boolean
	image: string
	likes: string[]
	mentionedTags: string[]
	mentionedUsers: string[]
	turnOffComments: boolean
	id: string
}
export interface PostProps {
	addedBy: string
	alt: string
	caption: string
	createdAt: Timestamp
	hideLikes: boolean
	turnOffComments: boolean
	image: string
	likes: string[]
	mentionedTags: string[]
	mentionedUsers: string[]
	id: string
}
export interface SingleStoryProps {
	addedBy: string
	createdAt: Timestamp
	image: string
	viewedBy: string[]
	id: string
}
export interface StoryTextToEditProps {
	text: string
	primaryColor: string
	align: string
	fontFamily: string
	variant: string
	x: number
	y: number
}
export interface UpdatedSingleStoryProps {
	userId: string
	user: UserProps
	stories: SingleStoryProps[]
}
export interface SingleSavedStoryProps {
	highlightGroupImage: string
	highlightGroupName: string
	storyIds: string[]
	id: string
	createdAt: Timestamp
	addedBy: string
}
export interface UpdatedSingleSavedStoryProps {
	highlightGroupImage: string
	highlightGroupName: string
	storyIds: string[]
	id: string
	createdAt: Timestamp
	addedBy: string
	user: UserProps
}
export interface SingleReactionProps {
	userId: string
	reaction: string
}
export interface SingleMessageProps {
	content: string
	content_type: string
	createdAt: Timestamp
	postId: string
	isReplyToMessage: boolean
	sender: string
	viewedBy: string[]
	reactions: SingleReactionProps[]
	attachments: string
	id: string
	replyInfo?: ReplyDataProps
}
export interface DescriptionDataProps {
	createdAt: Timestamp
	username: string
	addedBy: string
	userImage: string
	caption: string
	mentionedTags: string[]
	mentionedUsers: string[]
}
export interface SingleRepliesProps {
	createdAt: Timestamp
	mentionedTags: string[]
	mentionedUsers: string[]
	text: string
	user: string
	likes: string[]
}

export interface ReplyToCommentProps {
	isReplied: boolean
	commentId: string
	replyUsername: string
	replyUserId: string
	postId: string
}
export interface UpdatedTagProps {
	display: string
	postLength: number
	id: string | number
}
