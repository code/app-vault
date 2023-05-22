/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import errorMessage from 'vault/utils/error-message';

/**
 * @module Secrets
 * SecretsPage component is a child component to show list of secrets
 *
 * @param {array} secrets - array of secrets
 * @param {boolean} promptConfig - whether or not to display config cta
 * @param {array} pageFilter - array of filtered secrets
 * @param {array} breadcrumbs - breadcrumbs as an array of objects that contain label and route
 */
export default class SecretsPageComponent extends Component {
  @service flashMessages;

  get mountPoint() {
    return getOwner(this).mountPoint;
  }

  @action
  async onDelete(model) {
    try {
      const message = `Successfully deleted secret ${model.name}`;
      await model.destroyRecord();
      this.args.secrets.removeObject(model);
      this.flashMessages.success(message);
    } catch (error) {
      const message = errorMessage(error, 'Error deleting secret. Please try again or contact support');
      this.flashMessages.danger(message);
    }
  }
}
