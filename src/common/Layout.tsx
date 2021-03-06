import React from 'react';
import { Provider as PaperProvider, Portal } from 'react-native-paper';
import theme from 'theme';
import { UserContextProvider } from 'src/common/context/UserContext';
import { CreateRoomModalContextProvider } from './context/CreateRoomModalContext';
import NavBar from 'src/common/NavBar';
import { View } from 'react-native';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<PaperProvider theme={theme}>
			<CreateRoomModalContextProvider>
				<UserContextProvider>
					<Portal.Host>
						<View style={{ flexGrow: 1 }}>
							<NavBar />
							{children}
						</View>
					</Portal.Host>
				</UserContextProvider>
			</CreateRoomModalContextProvider>
		</PaperProvider>
	);
}

export default Layout;
