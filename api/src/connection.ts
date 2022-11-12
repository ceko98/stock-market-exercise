import { config } from "./config";

export const connection = {
  filename: config.get('db').file,
};