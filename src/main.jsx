import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Home, Register, Login, Detail, CreateProduct, Edit, List } from './pages';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './clients/apolloClient';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={apolloClient}>
		<React.StrictMode>
			<ProSidebarProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/create"
							element={
								<ProtectedRoute>
									<CreateProduct />
								</ProtectedRoute>
							}
						/>
						<Route path="/product">
							<Route
								path=""
								element={
									<ProtectedRoute>
										<List />
									</ProtectedRoute>
								}
							/>
							<Route
								path=":id"
								element={
									<ProtectedRoute>
										<Detail />
									</ProtectedRoute>
								}
							/>
							<Route
								path=":id/edit"
								element={
									<ProtectedRoute>
										<Edit />
									</ProtectedRoute>
								}
							/>
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="*"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ProSidebarProvider>
		</React.StrictMode>
	</ApolloProvider>
);
