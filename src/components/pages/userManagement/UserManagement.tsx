import { Button, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddForm from "./AddForm";
import LinksList from "./LinksList";
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    color: theme.palette.primary.background,
    marginTop: 24,
  },
  title: {
    display: "block",
  },
  addButton: {
    fontWeight: 500,
    " & .MuiButton-startIcon": {
      marginLeft: 8,
      marginRight: -2,
    },
  },
}));
const UserManagement = () => {
  const styles = useStyles();
  const [addMode, setAddMode] = useState<boolean>(false);
  const add = () => {
    !addMode && setAddMode(true);
  };
  return (
    <Paper elevation={1} className={styles.paper}>
      <Typography variant="caption" className={styles.title}>
        مسیرهای ارتباطی
      </Typography>
      <Button
        variant="text"
        color="warning"
        startIcon={<AddIcon />}
        size="small"
        className={styles.addButton}
        onClick={add}
        disabled={addMode}
      >
        افزودن مسیر ارتباطی
      </Button>
      <Collapse in={addMode}>
        <AddForm {...{ setAddMode, addMode }} />
      </Collapse>
      <LinksList />
    </Paper>
  );
};

export default UserManagement;
