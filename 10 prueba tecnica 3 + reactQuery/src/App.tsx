import {  useMemo, useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { SortBy } from "./types.d";
import { useUsers } from "./hooks/useUsers";

function App() {
	const {fetchNextPage,hasNextPage,isError,isLoading,refetch,users} = useUsers()

	const [showColors, setShowColors] = useState(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
	const [filterCountry, setFilterCountry] = useState<string | null>(null);

	

	const toggleColors = () => {
		setShowColors(!showColors);
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const handleReset = async () => {
		await refetch()
	};

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort);
	};

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
					{users.length>0 && 
					<UserList
						showColors={showColors}
						users={sortedUsers}
						changeSorting={handleChangeSort}
					/>}
					{isLoading && <p>Cargando...</p>}

					{isError && <p>Ha habido un error</p>}

					{!isLoading && !isError && users.length===0 && <p>No hay usuarios</p>}

					{!isLoading && !isError && hasNextPage===true && < button type="button" onClick={async ()=> fetchNextPage()}> Cargar más usuarios </button>}
				</main>
			</div>
		</>
	);
}

export default App;
