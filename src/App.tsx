import PageContainer from "./components/container/PageContainer";
import ToggleColorMode from "./utils/Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToggleColorMode>
        <PageContainer></PageContainer>
      </ToggleColorMode>
    </QueryClientProvider>
  );
};

export default App;
