import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { Footer } from "./components/Footer";
import { Game } from "./components/Game";
import { Start } from "./components/Start";
import { JavaScriptLogo } from "./icons/JavaScriptLogo";
import { useQuestionStore } from "./store/questions";

function App() {
	const questions = useQuestionStore((state) => state.questions);
	return (
		<main>
			<Container maxWidth="sm">
				<Stack
					direction="row"
					gap={2}
					alignItems="center"
					justifyContent="center"
				>
					<JavaScriptLogo />
					<Typography variant="h2" component="h1">
						JavaScript Quiz
					</Typography>
				</Stack>
				{questions.length === 0 && <Start />}
				{questions.length > 0 && <Game />}
				{questions.length > 0 && <Footer />}
			</Container>
		</main>
	);
}

export default App;
