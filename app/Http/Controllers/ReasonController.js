'use strict';

const Reason = use('App/Model/Reason');
const attributes = ['title', 'number'];

const Env = use('Env');

function isDevelopment() {
  return Env.get('NODE_ENV') === 'development';
}

class ReasonController {

  * index(request, response) {
    const reasons = yield Reason.with('slides').fetch();

    response.jsonApi('Reason', reasons);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const reason = new Reason(Object.assign({}, input, foreignKeys));

    if (isDevelopment()) {
      yield reason.save();
    }

    response.jsonApi('Reason', reason);
  }

  * show(request, response) {
    const id = request.param('id');
    const reason = yield Reason.with('slides').where({ id }).firstOrFail();

    response.jsonApi('Reason', reason);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const reason = yield Reason.with('slides').where({ id }).firstOrFail();
    reason.fill(Object.assign({}, input, foreignKeys));

    if (isDevelopment()) {
      yield reason.save();
    }

    response.jsonApi('Reason', reason);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const reason = yield Reason.query().where({ id }).firstOrFail();

    if (isDevelopment()) {
      yield reason.delete();
    }

    response.status(204).send();
  }

}

module.exports = ReasonController;
