import { Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer from "./users/slice";

const persistanceLocaleStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDataBaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;

		next(action);

		if (type === "users/deleteUserById") {
			toast.success("Usuario eliminado correctamente");
		}

		if (type === "users/addNewUser") {
			toast.success("Usuario creado correctamente");
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(persistanceLocaleStorageMiddleware)
			.concat(syncWithDataBaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
