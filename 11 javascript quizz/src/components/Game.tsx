import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import {
	Card,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionStore } from "../store/questions";
import { Question as QuestionType } from "../types";

const Question = ({ info }: { info: QuestionType }) => {
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex);
	};

	const getBackgroundColor = (index: number) => {
		const { userSelectedAnswer, correctAnswer } = info;
		if (userSelectedAnswer == null) return "transparent";
		if (index !== correctAnswer && index !== userSelectedAnswer)
			return "transparent";
		if (index === correctAnswer) return "green";
		if (index === userSelectedAnswer) return "red";
		return "transparent";
	};

	return (
		<Card
			variant="outlined"
			sx={{ textAlign: "left", bgcolor: "#222", p: 2, mt: 4 }}
		>
			<Typography variant="h5">{info.question}</Typography>
			<SyntaxHighlighter language="javascript" style={gradientDark}>
				{info.code}
			</SyntaxHighlighter>

			<List sx={{ bgcolor: "#333" }}>
				{info.answers.map((answer, index) => (
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<ListItem key={index} disablePadding divider>
						<ListItemButton
							disabled={info.userSelectedAnswer != null}
							onClick={createHandleClick(index)}
							sx={{ backgroundColor: getBackgroundColor(index) }}
						>
							<ListItemText primary={answer} sx={{ textAlign: "center" }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	);
};

export const Game = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
	const goPreviousQuestion = useQuestionStore(
		(state) => state.goPreviousQuestion,
	);

	const questionInfo = questions[currentQuestion];

	return (
		<>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
				justifyContent="center"
			>
				<IconButton
					onClick={goPreviousQuestion}
					disabled={currentQuestion === 0}
				>
					<ArrowBackIosNew />
				</IconButton>
				{currentQuestion + 1}/{questions.length}
				<IconButton
					onClick={goNextQuestion}
					disabled={currentQuestion >= questions.length - 1}
				>
					<ArrowForwardIos />
				</IconButton>
			</Stack>
			<Question info={questionInfo} />
		</>
	);
};
