import { Container } from "@mui/material";
import Header from "./Header";
import Main from "./Main";

const PageContainer = () => {
  return (
    <Container dir="rtl" maxWidth="md">
      <Header />
      <Main />
    </Container>
  );
};

export default PageContainer;
