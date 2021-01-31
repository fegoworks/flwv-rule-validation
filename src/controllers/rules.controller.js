/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import { BadRequest } from '../helpers/errorHandler';
import RulesServices from '../services/rules.service';

class RulesController {
  static async validateRule(req, res, next) {
    const { body: { rule, data } } = req;
    const checker = new RulesServices(res, rule, data);
    // console.log(checker);
    try {
      // check if body data is an array
      if (Array.isArray(data) || typeof data === 'string') {
        checker.checkDataFields();
        checker.checkConditions();
        return;
      }
      // check if body data is an object
      if (typeof data === 'object' && !Array.isArray(data)) {
        checker.checkObjectDataFields();
        if (checker.isNested()) {
          checker.checkNestedFieldConditions();
        }
        checker.checkConditions();
        return;
      }

      throw new BadRequest('data should be an object, string or an array.', null);
    } catch (err) {
      next(err);
    }
  }
}

export default RulesController;