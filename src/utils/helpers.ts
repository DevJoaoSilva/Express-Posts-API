import { Request } from 'express';
import { validationResult } from 'express-validator';

export const validateResults = (req: Request) => validationResult(req);
