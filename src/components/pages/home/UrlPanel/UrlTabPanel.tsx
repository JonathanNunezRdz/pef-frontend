import { useAppSelector } from '@/hooks';
import { selectAuth } from '@/store/auth/authReducer';
import SaveUrlForm from './SaveUrlForm';
import PostUrlForm from './PostUrlForm';

interface UrlTabPanelProps {}

export default function UrlTabPanel({}: UrlTabPanelProps) {
	// rtk hooks
	const { isLoggedIn } = useAppSelector(selectAuth);

	if (isLoggedIn) return <SaveUrlForm />;

	return <PostUrlForm />;
}
