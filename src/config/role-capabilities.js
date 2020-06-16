'use strict';

module.exports = {
  admin: ['create', 'read', 'update', 'delete', 'superuser'],
  editor: ['create', 'read', 'update', 'delete'],
  user: ['read', 'create', 'update', 'delete'],
};