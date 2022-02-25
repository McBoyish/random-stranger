/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Color, User } from 'types';
import { verify } from 'server/routers';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import StyleSheet from 'react-native-media-query';
import { useWindowDimensions, View } from 'react-native';

interface UserContextData {
	user: User;
	userLoading: boolean;
	loggedIn: boolean;
	token: string;
	updateToken: (_: string) => void;
	logoff: () => void;
}

const initialValue: User = { name: 'anon', _id: 'anon' };

const UserContext = createContext<UserContextData>({
	user: initialValue,
	userLoading: true,
	loggedIn: false,
	token: '',
	updateToken: () => null,
	logoff: () => null,
});

function useUserContext() {
	return useContext(UserContext);
}

function UserContextProvider({ children }: { children: React.ReactNode }) {
	const { height } = useWindowDimensions();
	const [user, setUser] = useState<User>(initialValue);
	const [userLoading, setUserLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const { color } = useTheme();
	const { styles } = styleSheet(color);

	useEffect(() => {
		// retrieve and verify token on page load
		let isMounted = true;
		const verifyToken = async () => {
			const token = localStorage.getItem('token');
			const user = await verify(token);
			if (isMounted && token && user) {
				setUser(user);
				setLoggedIn(true);
				setToken(token);
				// setUserLoading(false);
				setTimeout(() => setUserLoading(false), 50000);
				return;
			}
			if (isMounted && token && !user) {
				logoff();
				return;
			}
			if (isMounted && !token) {
				localStorage.setItem('token', '');
				setTimeout(() => setUserLoading(false), 50000);
				// setUserLoading(false);
				return;
			}
		};
		verifyToken();
		return () => {
			isMounted = false;
		};
	}, []);

	const updateToken = async (token: string) => {
		const user = await verify(token);
		if (user) {
			// update token if it is valid
			localStorage.setItem('token', token);
			setToken(token);
			setUser(user);
			!loggedIn && setLoggedIn(true);
			// userLoading && setUserLoading(false);
			setTimeout(() => setUserLoading(false), 50000);
		}
	};

	const logoff = () => {
		localStorage.setItem('token', '');
		setToken('');
		setUser(initialValue);
		loggedIn && setLoggedIn(false);
		userLoading && setUserLoading(false);
	};

	if (userLoading) return <ActivityIndicator style={styles.container} />;

	return (
		<UserContext.Provider
			value={{ user, userLoading, loggedIn, token, updateToken, logoff }}
		>
			{children}
		</UserContext.Provider>
	);
}

export { useUserContext, UserContextProvider };

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: color.background,
			padding: 20,
		},
	});
