import { SortBy, type User } from "../types.d";
import "./UserList.css";
interface Props {
	users: User[];
	showColors: boolean;
	deleteUser: (email: string) => void;
	changeSorting: (sort: SortBy) => void;
}
export function UserList({
	users,
	showColors,
	deleteUser,
	changeSorting,
}: Props) {
	return (
		<table style={{ width: "100%" }}>
			<thead>
				<tr>
					<th>Foto</th>

					<th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
						Nombre
					</th>
					<th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
						Apellido
					</th>
					<th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>
						País
					</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => {
					const backgroundColor = index % 2 === 0 ? "#333" : "#555";
					const color = showColors ? backgroundColor : "transparent";
					return (
						<tr key={user.email} style={{ backgroundColor: color }}>
							<td>
								<img
									src={user.picture.thumbnail}
									alt={`${user.name.first} ${user.name.last}`}
								/>
							</td>
							<td>{user.name.first}</td>
							<td>{user.name.last}</td>
							<td>{user.location.country}</td>
							<td>
								<button
									type="button"
									onClick={() => {
										deleteUser(user.email);
									}}
								>
									Borrar
								</button>{" "}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
