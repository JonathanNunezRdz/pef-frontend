import { useAppSelector } from '@/hooks';
import { selectAuth } from '@/store/auth/authReducer';
import PostRawTextForm from './PostRawTextForm';
import SaveRawTextForm from './SaveRawTextForm';

interface RawTextTabPanelProps {}

export default function RawTextTabPanel({}: RawTextTabPanelProps) {
	// rtk hooks
	const { isLoggedIn } = useAppSelector(selectAuth);

	if (isLoggedIn) return <SaveRawTextForm />;

	return <PostRawTextForm />;
}
