import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserAction";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};
	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Crear nuevo usuario</Title>
			<form className="" onSubmit={handleSubmit}>
				<TextInput placeholder="Aquí el nombre" name="name" />
				<TextInput placeholder="Aquí el email" name="email" />
				<TextInput placeholder="Aquí el usuario de github" name="github" />
				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span style={{ marginLeft: "8px" }}>
						{/* {result === "ok" && (
							<Badge style={{ backgroundColor: "#aed6c1", color: "green" }}>
								Guardado correctamente
							</Badge>
						)} */}
						{result === "ko" && (
							<Badge style={{ backgroundColor: "#e8cacb", color: "#a33c4a" }}>
								Los campos deben estar rellenos
							</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
