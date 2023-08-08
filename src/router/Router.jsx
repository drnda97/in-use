import {Suspense, useEffect, useState} from "react";

// Motion
import { motion } from 'framer-motion';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../redux/customise/customiseActions";

// Router
import {
    BrowserRouter,
    Route,
    Switch,
    useHistory,
} from "react-router-dom";

// Routes
import { Routes } from "./routes";

// Layouts
import VerticalLayout from "../layout/VerticalLayout";
import HorizontalLayout from "../layout/HorizontalLayout";
import FullLayout from "../layout/FullLayout";

// Components
import Analytics from "../view/main/dashboard/analytics";
import Error404 from "../view/pages/errors/404";
import Protected from "../protected/Protected";
import Login from "../view/pages/authentication/login";
import Cookies from "universal-cookie";

export default function Router() {
    const cookies = new Cookies();
    // Redux
    const customise = useSelector(state => state.customise);
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState("eyJhbGciOiJIUzUxMiJ9.eyJjb21wYW55X2lkIjoxLCJzdXBlcl9hZG1pbiI6dHJ1ZSwibmFtZSI6Ikl2YW4gS2FkaWMiLCJpZCI6MSwiZW1haWwiOiJpdmFuQGJyYW5kc2NoZWNrZXIuY29tIiwiaWF0IjoxNjkxNDg4NDgxLCJleHAiOjE2OTE1MDY0ODF9.pg8n0aLm6INR8ctUb7zWrc2cxGnQqFt3Yu8dMwNn_emDQRJoA6pUNvDYZYP8AP8F4UoMObEtxNEi0QmKLBiAwQ");

    // Location
    const location = useHistory()

    // Dark Mode
    let themeLocal

    useEffect(() => {
        if (localStorage) {
            themeLocal = localStorage.getItem("theme")
        }

        if (themeLocal === "light" || themeLocal === "dark") {
            document.querySelector("body").classList.add(themeLocal)
            dispatch(theme(themeLocal))
        } else {
            document.querySelector("body").classList.add(customise.theme)
            dispatch(theme(customise.theme))
        }
    }, [])

    // RTL
    useEffect(() => {
        if (customise.direction == "ltr") {
            document.querySelector("html").setAttribute("dir", "ltr");
        } else if (customise.direction == "rtl") {
            document.querySelector("html").setAttribute("dir", "rtl");
        }
    }, [])

    // Url Check
    useEffect(() => {
        // Theme
        if (location.location.search == "?theme=dark") {
            localStorage.setItem("theme", "dark")
            themeLocal = "dark"
        } else if (location.location.search == "?theme=light") {
            localStorage.setItem("theme", "light")
            themeLocal = "light"
        }

        // Direction
        if (location.location.search == "?direction=ltr") {
            document.querySelector("html").setAttribute("dir", "ltr");
        } else if (location.location.search == "?direction=rtl") {
            document.querySelector("html").setAttribute("dir", "rtl");
        }
    }, [])

    // Default Layout
    const DefaultLayout = customise.layout; // FullLayout or VerticalLayout

    // All of the available layouts
    const Layouts = { VerticalLayout, HorizontalLayout, FullLayout };

    // Return Filtered Array of Routes & Paths
    const LayoutRoutesAndPaths = (layout) => {
        const LayoutRoutes = [];
        const LayoutPaths = [];
        if (Routes) {
            // Checks if Route layout or Default layout matches current layout
            Routes.filter(route => (route.layout === layout) && (
                LayoutRoutes.push(route),
                LayoutPaths.push(route.path)
            ));
        }

        return { LayoutRoutes, LayoutPaths };
    };

    // Return Route to Render
    const ResolveRoutes = () => {
        return Object.keys(Layouts).map((layout, index) => {
            const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

            let LayoutTag;
            if (DefaultLayout == "HorizontalLayout") {
                if (layout == "VerticalLayout") {
                    LayoutTag = Layouts["HorizontalLayout"];
                } else {
                    LayoutTag = Layouts[layout];
                }
            } else {
                LayoutTag = Layouts[layout];
            }

            return (
                <Route path={LayoutPaths} key={index}>
                    <LayoutTag>
                        <Switch>
                            {LayoutRoutes.map((route) => {
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact === true}
                                        render={(props) => {
                                            return (
                                                <Protected isLoggedIn={isLoggedIn}>
                                                    <Suspense fallback={null}>
                                                        {
                                                            route.layout === 'FullLayout' ? (
                                                                <route.component {...props} />
                                                            ) : (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 50 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
                                                                >
                                                                    <route.component {...props} />
                                                                </motion.div>
                                                            )
                                                        }
                                                    </Suspense>
                                                </Protected>
                                            );
                                        }}
                                    />
                                );
                            })}
                        </Switch>
                    </LayoutTag>
                </Route >
            );
        });
    };

    return (
        <BrowserRouter>
            <Switch>
                {ResolveRoutes()}

                {/*Home Page */}
                <Route
                    exact
                    path={'/'}
                    render={() => {
                        return (
                            <Protected isLoggedIn={isLoggedIn}>
                                {DefaultLayout == "HorizontalLayout" ? (
                                    <Layouts.HorizontalLayout>
                                        <Analytics/>
                                    </Layouts.HorizontalLayout>
                                ) : (
                                    <Layouts.VerticalLayout>
                                        <Analytics/>
                                    </Layouts.VerticalLayout>
                                )}
                            </Protected>
                        )
                    }}
                />
                <Route path='/login'>
                    <Login />
                </Route>

                {/* NotFound */}
                <Route path='*'>
                    <Error404 />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};