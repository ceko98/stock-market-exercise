import path from "path";
import { config } from "./config";

const filename = config.get('env') === 'test' ? config.get('test').file : config.get('db').file;
export const connection = {
  filename: path.join(process.cwd(), filename),
};

export const migrationConnection = {
  filename: path.join(process.cwd(), '../../', filename),
};
