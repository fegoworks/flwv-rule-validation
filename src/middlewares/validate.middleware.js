/* eslint-disable camelcase */
import { BadRequest } from '../helpers/responseHandler';

const checkField = (field) => {
  if (field === undefined || field === null) throw new BadRequest('field is required.', null);
};

const checkCondition = (condition) => {
  if (!condition) throw new BadRequest('condition is required.', null);
  if (!/\beq\b|\bcontains\b|\bgte\b|\bneq\b|\bgt\b/g.test(condition)) {
    throw new BadRequest(
      "condition accepts only 'eq','neq','gt','gte' or 'contains'.",
      null
    );
  }
};

const checkConditionValue = (condition_value) => {
  if (condition_value === undefined || condition_value === null) throw new BadRequest('condition_value is required.', null);
};

const validateRule = (rule) => {
  if (!rule) throw new BadRequest('rule is required.', null);
  if (typeof rule !== 'object') throw new BadRequest('rule should be an object.', null);
  checkField(rule.field);
  checkCondition(rule.condition);
  checkConditionValue(rule.condition_value);
};

const validateData = (data) => {
  if (!data) throw new BadRequest('data is required.', null);
};

// eslint-disable-next-line import/prefer-default-export
export const validateRequiredFields = (req, res, next) => {
  const { body: { rule, data } } = req;
  try {
    validateRule(rule);
    validateData(data);
    next();
  } catch (err) {
    next(err);
  }
};