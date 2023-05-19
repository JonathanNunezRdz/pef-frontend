import { useAppSelector } from '@/hooks';
import { selectAuth } from '@/store/auth/authReducer';
import SaveFileForm from './SaveFileForm';
import PostFileForm from './PostFileForm';

interface FileTabPanelProps {}

export default function FileTabPanel({}: FileTabPanelProps) {
	// rtk hooks
	const { isLoggedIn } = useAppSelector(selectAuth);

	if (isLoggedIn) return <SaveFileForm />;

	return <PostFileForm />;
}
