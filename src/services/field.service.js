/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import { HttpErrorCodes } from '../helpers/errorHandler';

class FieldServices {
  constructor(res, rule, data) {
    this.res = res;
    this.rule = rule;
    this.data = data;
  }

  checkObjectDataFields() {
    const hasField = (field, data) => {
      if (!(field in data)) {
        throw this.errorResponse('fieldValidation');
      }
    };
    // check for nested fields
    if (typeof this.rule.field === 'string' && this.isNested()) {
      const keys = this.getNestedFieldsKeys();
      if (keys[0] in this.data) {
        hasField(keys[1], this.data[keys[0]]);
      } else throw this.errorResponse('fieldValidation');
    } else hasField(this.rule.field, this.data);
  }

  checkDataFields() {
    if (this.data[this.rule.field] === undefined || this.data[this.rule.field] === null) {
      throw this.errorResponse('fieldValidation');
    }
  }

  isNested() {
    return this.rule.field.includes('.');
  }

  getNestedFieldsKeys() {
    return this.rule.field.split('.');
  }

  getFieldValue() {
    return typeof this.data === 'object'
      && typeof this.rule.field === 'string'
      && this.isNested()
      ? this.data[this.getNestedFieldsKeys()[0]][this.getNestedFieldsKeys()[1]]
      : this.data[this.rule.field];
  }

  successResponse() {
    return this.res.json({
      message: `field ${this.rule.field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field: this.rule.field,
          field_value: this.getFieldValue(),
          condition: this.rule.condition,
          condition_value: this.rule.condition_value,
        },
      },
    });
  }

  errorResponse(fieldValidation = '') {
    if (fieldValidation) {
      return this.res.status(HttpErrorCodes.BAD_REQUEST).json({
        message: `field ${this.rule.field} is missing from data.`,
        status: 'error',
        data: null
      });
    }
    return this.res.status(HttpErrorCodes.BAD_REQUEST).json({
      message: `field ${this.rule.field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field: this.rule.field,
          field_value: this.getFieldValue(),
          condition: this.rule.condition,
          condition_value: this.rule.condition_value,
        },
      }
    });
  }
}

export default FieldServices;