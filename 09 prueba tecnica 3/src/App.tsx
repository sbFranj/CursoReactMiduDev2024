import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { SortBy, type User } from "./types.d";

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [showColors, setShowColors] = useState(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
	const [filterCountry, setFilterCountry] = useState<string | null>(null);

	const originalUsers = useRef<User[]>([]);

	const toggleColors = () => {
		setShowColors(!showColors);
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const handleDelete = (email: string) => {
		const filteredUsers = users.filter((user) => user.email !== email);
		setUsers(filteredUsers);
	};

	const handleReset = () => {
		setUsers(originalUsers.current);
	};

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort);
	};

	useEffect(() => {
		fetch("https://randomuser.me/api?results=100")
			.then((res) => res.json())
			.then((res) => {
				setUsers(res.results);
				originalUsers.current = res.results;
			});
	}, []);

	const filteredUsers = useMemo(() => {
		return filterCountry !== null && filterCountry.length > 0
			? users.filter((user) => {
					return user.location.country
						.toLowerCase()
						.includes(filterCountry.toLowerCase());
			  })
			: users;
	}, [users, filterCountry]);

	const sortedUsers = useMemo(() => {
		if (sorting === SortBy.COUNTRY) {
			return filteredUsers.toSorted((a, b) =>
				a.location.country.localeCompare(b.location.country),
			);
		}

		if (sorting === SortBy.NAME) {
			return filteredUsers.toSorted((a, b) =>
				a.name.first.localeCompare(b.name.first),
			);
		}

		if (sorting === SortBy.LAST) {
			return filteredUsers.toSorted((a, b) =>
				a.name.last.localeCompare(b.name.last),
			);
		}

		return filteredUsers;
	}, [filteredUsers, sorting]);

	return (
		<>
			<div className="App">
				<h1>Prueba técnica</h1>
				<header>
					<button type="button" onClick={toggleColors}>
						Colorear filas
					</button>

					<button type="button" onClick={toggleSortByCountry}>
						Ordenar por pais
					</button>

					<button type="button" onClick={handleReset}>
						Reestablecer usuarios
					</button>
					<input
						onChange={(e) => {
							setFilterCountry(e.target.value);
						}}
						type="text"
						placeholder="Filtrar por país"
					/>
				</header>
				<main>
					<UserList
						showColors={showColors}
						users={sortedUsers}
						deleteUser={handleDelete}
						changeSorting={handleChangeSort}
					/>
				</main>
			</div>
		</>
	);
}

export default App;
