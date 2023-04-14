'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    isOAuth: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 20]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: true,
      validate: {
        len: [60, 60],
        notOAuth(value) {
          if (!value && !this.isOAuth) {
            throw new Error('Password is required unless you register with OAuth.')
          }
        }
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });

  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: {[Op.iLike]: credential},
          email: {[Op.iLike]: credential}
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.googleLogin = async function ({ credential }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
          email: {[Op.iLike]: credential}
      }
    });
    if (user) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.googleSignup = async function ({ username, email }) {
    const user = await User.create({
      username,
      email,
      isOAuth: 'google'
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function (models) {
    User.hasMany(models.Spot, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true
    })
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true
    })
  };

  return User;
};
