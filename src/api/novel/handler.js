const ClientError = require('../../expceptions/ClientError');

class NovelHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNovelHandler = this.postNovelHandler.bind(this);
    this.getNovelHandler = this.getNovelHandler.bind(this);
    this.getNovelByIdHandler = this.getNovelByIdHandler.bind(this);
    this.putNovelByIdHandler = this.putNovelByIdHandler.bind(this);
    this.deleteNovelByIdHandler = this.deleteNovelByIdHandler.bind(this);
  }

  async postNovelHandler(request, h) {
    try {
      this._validator.validateNovelPayload(request.payload);
      const { judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_admin, id_genre } = request.payload;

      const novelId = await this._service.addNovel({ judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_admin, id_genre });

      const response = h.response({
        status: 'success',
        message: 'Novel berhasil ditambahkan',
        data: {
          novelId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async getNovelHandler() {
    const novel = await this._service.getNovel();
    return {
      status: 'success',
      data: {
        novel,
      },
    };
  }

  async getNovelByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const novelId = parseInt(id, 10);

      if (isNaN(novelId)) {
        throw new ClientError('Invalid ID format', 400);
      }

      const novel = await this._service.getNovelById(novelId);
      return {
        status: 'success',
        data: {
          novel,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async putNovelByIdHandler(request, h) {
    try {
      this._validator.validateNovelPayload(request.payload);
      const { id } = request.params;
      const novelId = parseInt(id, 10);

      if (isNaN(novelId)) {
        throw new ClientError('Invalid ID format', 400);
      }

      await this._service.editNovelById(novelId, request.payload);
      return {
        status: 'success',
        message: 'Novel berhasil diperbarui',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async deleteNovelByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const novelId = parseInt(id, 10);

      if (isNaN(novelId)) {
        throw new ClientError('Invalid ID format', 400);
      }

      await this._service.deleteNovelById(novelId);
      return {
        status: 'success',
        message: 'Novel berhasil dihapus',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  _handleError(error, h) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    // Server ERROR!
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
  }
}

module.exports = NovelHandler;
