const Jwt = require('@hapi/jwt');

const TokenManager = {
  generateAccessToken: (payload) => {
    return Jwt.token.generate(payload, {
      key: process.env.ACCESS_TOKEN_KEY,
      algorithm: 'HS256',
    });
  },
  generateRefreshToken: (payload) => {
    return Jwt.token.generate(payload, {
      key: process.env.REFRESH_TOKEN_KEY,
      algorithm: 'HS256',
    });
  },
  verifyRefreshToken: (token) => {
    try {
      const artifacts = Jwt.token.decode(token);
      Jwt.token.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
      return artifacts.decoded.payload;
    } catch (error) {
      throw new Error('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
