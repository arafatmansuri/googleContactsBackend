import { Router } from "express";
import { importGoogleContacts } from "./googleContactsController.js";


const googleRouter = Router();

googleRouter.get("/auth/google/contacts", importGoogleContacts);

export { googleRouter };