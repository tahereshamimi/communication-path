import { Button, Link, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { getLinks, deleteLink } from "../../../server/services";
import { LinkDataType, Type, types } from "./utils";
import { Theme } from "@mui/system";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Icon from "@mui/material/Icon";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginBottom: 10,
    color: theme.palette.primary.background,
  },
  deleteButton: {
    fontWeight: 500,
    " & .MuiButton-startIcon": {
      marginLeft: 8,
      marginRight: -2,
    },
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleDetail: {
    display: "flex",
    columnGap: 10,
  },
}));
const LinksList = () => {
  const styles = useStyles();
  const { data: links, refetch } = useQuery<LinkDataType[]>(
    ["getLinks"],
    async () => {
      const { data } = await getLinks();
      return data;
    }
  );
  const { mutate: handleDelete } = useMutation(
    async (id: string) => {
      const { data } = await deleteLink(id);
      return data;
    },
    {
      onSuccess() {
        refetch();
      },
    }
  );

  return (
    <div>
      {links?.map((link: LinkDataType) => (
        <Paper key={link.id} className={styles.paper}>
          <div className={styles.row}>
            <Typography className={styles.titleDetail}>
              <Icon
                fontSize="small"
                component={types.find((item) => item.key === link.type)?.icon}
              />
              {/* {types.find((item) => item.key === link.type)?.icon} */}
              {types.find((item) => item.key === link.type)?.title}
              <Link
                // underline="always"
                sx={{
                  color: (theme) => theme.palette.warning.light,
                  textDecoration: "underline",
                  mr: "10px",
                }}
              >
                {link.link}
              </Link>
            </Typography>
            <div>
              <Button
                variant="text"
                color="error"
                startIcon={<DeleteIcon />}
                size="small"
                className={styles.deleteButton}
                onClick={() => handleDelete(link.id)}
              >
                حذف
              </Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default LinksList;
