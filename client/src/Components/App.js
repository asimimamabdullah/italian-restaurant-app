import React, { lazy, Suspense, useEffect } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import "./App.css";
import Header from "./Screens/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Screens/Global/Loading";
import { useStateValue } from "../StateProvider";
import Home from "./Screens/Home/Home";
import ScrollToTop from "./Screens/Global/ScrollToTop";

const FoundOrder = lazy(() => import("./Screens/FindOrder/FoundOrder"));
const OrderSucces = lazy(() => import("./Screens/Checkout/OrderSuccess"));
const NotFound = lazy(() => import("./Screens/Global/NotFound"));
const Login = lazy(() => import("./Screens/Auth/Login"));
const AllProductsHeader = lazy(() =>
	import("./DevAdmin/Products/AllProductsHeader/AllProductsHeader")
);
const Pay = lazy(() => import("./Screens/Checkout/Pay"));
const RegisteredUsers = lazy(() => import("./DevAdmin/users/RegisteredUsers"));
const Dashboard = lazy(() => import("./DevAdmin/Dashboard/Dashboard"));
const Location = lazy(() => import("./Screens/Location/Location"));
const Order = lazy(() => import("./Screens/Order/Order"));
const Cart = lazy(() => import("./Screens/Cart/Cart"));
const About = lazy(() => import("./Screens/About/About"));
const Orders = lazy(() => import("./Screens/OrderHistory/Orders"));
const Checkout = lazy(() => import("./Screens/Checkout/Checkout"));
const Settings = lazy(() => import("./Screens/Settings/Settings"));
const CreateCategory = lazy(() =>
	import("./DevAdmin/Categories/CreateCategory")
);
const FindOrder = lazy(() => import("./Screens/FindOrder/FindOrder"));

const MenuScreen = lazy(() => import("./Screens/Menu/MenuScreen"));
const CreateProduct = lazy(() => import("./DevAdmin/Products/CreateProduct"));
const Register = lazy(() => import("./Screens/Auth/Register"));
const AllProducts = lazy(() =>
	import("./DevAdmin/Products/Products/AllProducts")
);
const PostalCodes = lazy(() =>
	import("./DevAdmin/ManagePostalCodes/PostalCodes")
);
const ManageOrders = lazy(() =>
	import("./DevAdmin/Orders/Orders/ManageOrders")
);
const DashboardHome = lazy(() => import("./DevAdmin/Dashboard/Home/Home"));
const Reports = lazy(() => import("./DevAdmin/Reports/Reports"));
const OrderInfo = lazy(() => import("./DevAdmin/Orders/OrderInfo/OrderInfo"));

function App() {
	const { userAPI } = useStateValue();
	const [isAdmin] = userAPI.isAdmin;
	const { userID } = userAPI;

	useEffect(() => {
		if (isAdmin) {
			const beamsClient = new PusherPushNotifications.Client({
				instanceId: "8f9950c1-3405-4dfd-a3a1-48254faff0a3",
			});

			try {
				beamsClient
					.start()
					.then(() =>
						beamsClient.addDeviceInterest(`hello_${userID && userID}`)
					)
					.then(() =>
						console.log("Successfully registered and subscribed!")
					)
					.catch((err) => {
						Notification.requestPermission();
						console.log("error: ", err);
					});
			} catch (error) {
				console.log("pusher not valid ");
			}
		}
	}, [userID, isAdmin]);
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Header />}>
						<Route
							index
							element={
								<>
									<ScrollToTop />
									<Home />
								</>
							}
						/>

						<Route
							path="menu"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<MenuScreen />
									</Suspense>
								</>
							}
						/>

						<Route
							path="order"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Order />
									</Suspense>
								</>
							}
						/>

						<Route
							path="order/:categoryName"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Order />
									</Suspense>
								</>
							}
						/>

						<Route
							path="checkout"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Checkout />
									</Suspense>
								</>
							}
						/>
						<Route
							path="checkout/paymentOptions"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Pay />
									</Suspense>
								</>
							}
						/>
						<Route
							path="checkout/ordersuccess/:orderID"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<OrderSucces />
									</Suspense>
								</>
							}
						/>

						<Route
							path="findorder/:orderNumber"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<FoundOrder />
									</Suspense>
								</>
							}
						/>

						<Route
							path="findorder"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<FindOrder />
									</Suspense>
								</>
							}
						/>
						<Route
							path="about"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<About />
									</Suspense>
								</>
							}
						/>
						<Route
							path="find-us"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Location />
									</Suspense>
								</>
							}
						/>
						<Route
							path="orders"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Orders />
									</Suspense>
								</>
							}
						/>
						<Route
							path="login"
							element={
								<>
									<ScrollToTop />
									<Suspense fallback={<Loading />}>
										<Login />
									</Suspense>
								</>
							}
						/>

						<Route
							path="register"
							element={
								<Suspense fallback={<Loading />}>
									<Register />
								</Suspense>
							}
						/>

						<Route
							path="cart"
							element={
								<Suspense fallback={<Loading />}>
									<Cart />
								</Suspense>
							}
						/>

						<Route
							path="settings"
							element={
								<Suspense fallback={<Loading />}>
									<Settings />
								</Suspense>
							}
						/>
						<Route
							path="*"
							element={
								<Suspense fallback={<Loading />}>
									<NotFound />
								</Suspense>
							}
						/>
					</Route>
					{isAdmin ? (
						<Route
							path="/dashboard"
							element={
								<Suspense fallback={<Loading />}>
									<Dashboard />
								</Suspense>
							}>
							<Route
								index
								element={
									<Suspense fallback={<Loading />}>
										<DashboardHome />
									</Suspense>
								}
							/>

							<Route
								path="postalcodes"
								element={
									<Suspense fallback={<Loading />}>
										<PostalCodes />
									</Suspense>
								}
							/>
							<Route
								path="all_orders/:orderNumber"
								element={
									<Suspense fallback={<Loading />}>
										<OrderInfo />
									</Suspense>
								}
							/>
							<Route
								path="all_orders"
								element={
									<Suspense fallback={<Loading />}>
										<ManageOrders />
									</Suspense>
								}
							/>

							<Route
								path="all_users"
								element={
									<Suspense fallback={<Loading />}>
										<RegisteredUsers />
									</Suspense>
								}
							/>
							<Route
								path="products"
								element={
									<Suspense fallback={<Loading />}>
										<AllProductsHeader />
									</Suspense>
								}>
								<Route
									index
									element={
										<Suspense fallback={<Loading />}>
											<AllProducts />
										</Suspense>
									}
								/>
								<Route
									path="create_product"
									element={
										<Suspense fallback={<Loading />}>
											<CreateProduct />
										</Suspense>
									}
								/>
							</Route>
							<Route
								path="create_category"
								element={
									<Suspense fallback={<Loading />}>
										<CreateCategory />
									</Suspense>
								}
							/>

							<Route
								path="all_reservoirs"
								element={
									<Suspense fallback={<Loading />}>
										<ManageOrders />
									</Suspense>
								}
							/>
							<Route
								path="reports"
								element={
									<Suspense fallback={<Loading />}>
										<Reports />
									</Suspense>
								}
							/>
						</Route>
					) : (
						<Route
							path="dashboard/*"
							element={
								<>
									<Header />
									<Suspense fallback={<Loading />}>
										<NotFound />
									</Suspense>
								</>
							}
						/>
					)}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
