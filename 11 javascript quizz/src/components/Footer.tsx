import { Button } from "@mui/material";
import { useQuestionData } from "../hooks/useQuestionData";
import { CorrectIcon } from "../icons/CorrectIcon";
import { IncorrectIcon } from "../icons/IncorrectIcon";
import { QuestionIcon } from "../icons/QuestionIcon";
import { useQuestionStore } from "../store/questions";

export const Footer = () => {
	const { correct, incorrect, unanswer } = useQuestionData();
	const reset = useQuestionStore((state) => state.reset);
	return (
		<footer style={{ marginTop: "16px" }}>
			<strong>
				<CorrectIcon />
				{correct} correctas
				<IncorrectIcon />
				{incorrect} incorrectas
				<QuestionIcon />
				{unanswer} sin responder
			</strong>
			<div style={{ marginTop: "16px" }}>
				<Button onClick={() => reset()}>Empezar otro Quiz</Button>
			</div>
		</footer>
	);
};
