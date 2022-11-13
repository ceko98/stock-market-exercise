import { config } from "../src/config";

export const connection = {
  filename: config.get('test').file,
};