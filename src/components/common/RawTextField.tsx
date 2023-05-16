import { PostAnalysisDto, SaveAnalysisDto } from '@/types';
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface SaveRawTextField {
	control: Control<SaveAnalysisDto>;
	from: 'save';
}

interface PostRaexTextField {
	control: Control<PostAnalysisDto>;
	from: 'post';
}

type RawTextFieldProps = SaveRawTextField | PostRaexTextField;

export default function RawTextField({ control, from }: RawTextFieldProps) {
	if (from === 'save') {
		return (
			<Controller
				control={control}
				name='text'
				render={({ field, fieldState: { error } }) => (
					<TextField
						ref={field.ref}
						value={field.value}
						onChange={field.onChange}
						onBlur={field.onBlur}
						inputProps={{ 'aria-label': 'Texto a analizar' }}
						label='Introduce tu texto'
						error={Boolean(error)}
						helperText={error?.message}
						fullWidth
						multiline
						minRows={5}
						maxRows={10}
					/>
				)}
			/>
		);
	}
	return (
		<Controller
			control={control}
			name='text'
			render={({ field, fieldState: { error } }) => (
				<TextField
					ref={field.ref}
					value={field.value}
					onChange={field.onChange}
					onBlur={field.onBlur}
					inputProps={{ 'aria-label': 'Texto a analizar' }}
					label='Introduce tu texto'
					error={Boolean(error)}
					helperText={error?.message}
					fullWidth
					multiline
					minRows={5}
					maxRows={10}
				/>
			)}
		/>
	);
}
