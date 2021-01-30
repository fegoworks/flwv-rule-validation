/* eslint-disable indent */
/* eslint-disable no-useless-constructor */
/* eslint-disable require-jsdoc */
import FieldServices from './field.service';

class RulesServices extends FieldServices {
  constructor(res, rule, data) {
    super(res, rule, data);
  }

  checkConditions() {
    switch (this.rule.condition) {
      case 'eq': {
        if (this.data[this.rule.field] !== this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      case 'neq': {
        if (this.data[this.rule.field] === this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      case 'gt': {
        if (this.data[this.rule.field] <= this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      case 'gte': {
        if (this.data[this.rule.field] < this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      default: {
        if (this.data[this.rule.field].toString().indexOf(this.rule.condition_value) === -1) {
          this.errorResponse();
        }
      }
    }
    return this.successResponse();
  }

  // Check nested field data against the condition value
  checkNestedFieldConditions() {
    const keys = this.getNestedFieldsKeys();
    switch (this.rule.condition) {
      case 'eq': {
       if (this.data[keys[0]][keys[1]] !== this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      case 'neq': {
        if (this.data[keys[0]][keys[1]] === this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      case 'gt': {
        if (this.data[keys[0]][keys[1]] <= this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      case 'gte': {
        if (this.data[keys[0]][keys[1]] < this.rule.condition_value) {
          this.errorResponse();
        }
        return this.successResponse();
      }
      default: {
        if (this.data[keys[0]][keys[1]].toString().indexOf(this.rule.condition_value) === -1) {
          this.errorResponse();
        }
      }
    }
    return this.successResponse();
  }
}

export default RulesServices;