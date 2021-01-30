/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
export default class Services {
  constructor(res, rule, data) {
    this.res = res;
    this.rule = rule;
    this.data = data;
  }

  checkObjectDataFields() {
    const hasField = (field, data) => {
      if (!(field in data)) {
        throw this.createErrorResponse('fieldValidation');
      }
    };
    // check for nested fields
    if (typeof this.rule.field === 'string' && this.isNested()) {
      const keys = this.getNestedFieldsKeys();
      if (keys[0] in this.data) {
        hasField(keys[1], this.data[keys[0]]);
      } else throw this.createErrorResponse('fieldValidation');
    } else hasField(this.rule.field, this.data);
  }

  checkDataFields() {
    if (
      this.data[this.rule.field] === undefined
      || this.data[this.rule.field] === null
    ) { throw this.createErrorResponse('fieldValidation'); }
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
}