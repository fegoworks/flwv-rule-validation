/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import express from 'express';
import { validateRequiredFields } from '../middlewares/validate.middleware';
import RulesController from '../controllers/rules.controller';

const router = express.Router();

router.post('/validate-rule',
  validateRequiredFields,
  RulesController.validateRule);

export default router;