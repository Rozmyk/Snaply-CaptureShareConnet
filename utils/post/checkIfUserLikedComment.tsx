import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export const checkIfUserLikedComment = async (postId: string, commentId: string, userId: string) => {
  try {
    const commentRef = doc(db, 'posts', postId, 'comments', commentId);
    const commentDoc = await getDoc(commentRef);

    if (commentDoc.exists()) {
      const commentData = commentDoc.data();
      const likes = commentData.likes || [];
      return likes.includes(userId);
    } else {
      console.log('Comment not found');
      return false;
    }
  } catch (error) {
    console.error('Error checking if user liked comment:', error);
    return false;
  }
};
