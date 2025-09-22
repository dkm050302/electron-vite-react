import { create } from "dva-core";
import createLoading from "dva-loading";
import app from "../models/app";

const app_dva = create();

app_dva.use(createLoading());

app_dva.model(app);

app_dva.start();

export default app_dva._store;
