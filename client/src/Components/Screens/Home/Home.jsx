import React, { Suspense, lazy } from "react";
import "./Home.css";

// Sections
import Footer from "./Sections/Footer";
import Loading from "../Global/Loading";
import SlideFront from "./Sections/SlideFront";


const Menu = lazy(() => import("./Sections/Menu"));
const ReserveSeat = lazy(() => import("./Sections/ReserveSeat"));
const Categories = lazy(() => import("./Sections/Categories"));
const Items = lazy(() => import("./Sections/Items"));

const Home = () => {
    return (
        <>
            <div className="Home">
                <SlideFront async />

                <Suspense fallback={<Loading />}>
                    <Categories />
                </Suspense>

                <Suspense fallback={<Loading />}>
                    <Items />
                </Suspense>

                <Suspense fallback={<Loading />}>
                    <Menu />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <ReserveSeat />
                </Suspense>

                <Footer />
            </div>
        </>
    );
};

export default Home;
