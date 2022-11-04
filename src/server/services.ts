import axios from "axios";
import { LinkDataType } from "../components/pages/userManagement/utils";
axios.defaults.baseURL = "http://localhost:3001";

export const getLinks = () => {
  return axios.get("/links");
};

export const addLink = (link: LinkDataType) => {
  return axios.post("/links", link);
};
export const deleteLink = (id: string) => {
  return axios.delete("/links/" + id);
};
