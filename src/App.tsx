import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@services/queryClient";
import "./App.css";
import "@mantine/core/styles.css";
import Main from "@pages/Main";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "@pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/details",
    element: <Details />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
