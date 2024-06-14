const { Pool } = require('pg');
const InvariantError = require('../../expceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addToken(accessToken, refreshToken) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1, $2)',
      values: [accessToken, refreshToken],
    };

    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT * FROM authentications WHERE refresh_token = $1',
      values: [token],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Refresh token is not valid');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE refresh_token = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationsService;
