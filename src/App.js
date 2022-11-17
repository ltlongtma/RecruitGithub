import { guestRoute, adminRoute, publicRoute, userRoute } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DefaultLayout } from "./components/Layout/DefaultLayout";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);
  // const role = sessionStorage.getItem("isRole");
  const role = "ADMIN";
  const isToken = sessionStorage.getItem("isToken");

  // useEffect(() => {
  //   if (!isToken) {
  //     navigate("/login");
  //   }

  //   setIsLogined(true);
  // }, []);
  useEffect(() => {
    setIsLogined(true);
  }, []);
  return (
    <div className="App">
      <Routes>
        {publicRoute.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}

        {isLogined &&
          role === "ADMIN" &&
          adminRoute.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        {isLogined &&
          role === "USER" &&
          userRoute.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        {isLogined &&
          role === "GUEST" &&
          guestRoute.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
      </Routes>
    </div>
  );
}

export default App;
