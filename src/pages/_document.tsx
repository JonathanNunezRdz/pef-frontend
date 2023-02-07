import createEmotionServer from '@emotion/server/create-instance';
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document';
import createEmotionCache from '@/utils/createEmotionCache';
import theme from '@/styles/theme';

interface Props extends DocumentInitialProps {
	emotionStyleTags: JSX.Element[];
}

class MyDocument extends Document {
	// static async getInitialProps(ctx: DocumentContext): Promise<Props> {
	// 	const origialRenderPage = ctx.renderPage;

	// 	const cache = createEmotionCache();
	// 	const { extractCriticalToChunks } = createEmotionServer(cache);

	// 	ctx.renderPage = () =>
	// 		origialRenderPage({
	// 			enhanceApp: (App: any) =>
	// 				function EnhanceApp(props) {
	// 					return <App emotionCache={cache} {...props} />;
	// 				},
	// 		});

	// 	const initialProps = await Document.getInitialProps(ctx);

	// 	const emotionStyles = extractCriticalToChunks(initialProps.html);
	// 	const emotionStyleTags = emotionStyles.styles.map((style) => (
	// 		<style
	// 			data-emotion={`${style.key} ${style.ids.join(' ')}`}
	// 			key={style.key}
	// 			dangerouslySetInnerHTML={{ __html: style.css }}
	// 		/>
	// 	));

	// 	return { ...initialProps, emotionStyleTags };
	// }

	render() {
		return (
			<Html lang='es'>
				<Head>
					<meta
						name='theme-color'
						content={theme.palette.primary.main}
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const origialRenderPage = ctx.renderPage;
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		origialRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);

	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};

export default MyDocument;
