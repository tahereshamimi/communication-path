import {
  Button,
  CardActions,
  Grid,
  Icon,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Inputs, types } from "./utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLink } from "../../../server/services";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  title: {
    display: "block",
    marginBottom: 16,
  },
  buttons: {
    display: "flex",
    justifyContent: "end",
    padding: "0px!important",
    marginTop: 16,
    columnGap: 8,
  },
});
const validationSchema = yup.object({
  linkType: yup.string().required("نوع را انتخاب کنید"),
  linkAddress: yup
    .string()
    .url("ادرس صحیح را وارد کنید")
    .required("آدرس را وارد کنید"),
});

const AddForm = ({
  setAddMode,
  addMode,
}: {
  setAddMode: React.Dispatch<React.SetStateAction<boolean>>;
  addMode: boolean;
}) => {
  const styles = useStyles();
  const id = uuidv4();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      linkType: "",
      linkAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  const { mutate } = useMutation(
    async (link: Inputs) => {
      const { data } = await addLink({
        id,
        link: link.linkAddress,
        type: link.linkType,
      });
    },
    {
      onSuccess() {
        setAddMode(false);
        queryClient.fetchQuery(["getLinks"]);
      },
    }
  );
  useEffect(() => {
    if (!addMode) {
      formik.resetForm();
    }
  }, [addMode]);

  return (
    <Paper elevation={1}>
      <Typography className={styles.title}>
        افزودن مسیر ارتباطی{" "}
        {types.find((item) => item.key === formik.values.linkType)?.title}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="linkType"
              name="linkType"
              label="نوع"
              select
              value={formik.values.linkType}
              onChange={formik.handleChange}
              error={formik.touched.linkType && Boolean(formik.errors.linkType)}
              sx={{ direction: "rtl" }}
            >
              {types.map((type) => (
                <MenuItem value={type.key} key={type.key}>
                  <Icon fontSize="small" component={type?.icon} /> {type.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              id="linkAddress"
              name="linkAddress"
              label="لینک"
              value={formik.values.linkAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.linkAddress && Boolean(formik.errors.linkAddress)
              }
              helperText={
                formik.touched.linkAddress && formik.errors.linkAddress
              }
            />
          </Grid>
        </Grid>
        <CardActions className={styles.buttons} disableSpacing={true}>
          <Button
            onClick={() => setAddMode(false)}
            color="warning"
            variant="outlined"
            size="small"
          >
            انصراف
          </Button>
          <Button
            color="warning"
            variant="contained"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            size="small"
          >
            ثبت مسیر ارتباطی{" "}
            {types.find((item) => item.key === formik.values.linkType)?.title}
          </Button>
        </CardActions>
      </form>
    </Paper>
  );
};

export default AddForm;
