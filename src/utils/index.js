const mapDBToModelGenre = ({
    id_genre,
    nama_genre,
    id_admin,
  }) => ({
    id: id_genre,
    nama: nama_genre,
    idAdmin: id_admin,
  });
  
  const mapDBToModelNovel = ({
    id_novel,
    judul_novel,
    deskripsi,
    pengarang,
    penerbit,
    tgl_rilis,
    img,
    id_admin,
    id_genre,
  }) => ({
    id_novel: id_novel,
    judul: judul_novel,
    deskripsi: deskripsi,
    pengarang: pengarang,
    penerbit: penerbit,
    tgl_rilis: tgl_rilis,
    gambar: img,
    id_admin: id_admin,
    id_genre: id_genre,
  });
  
  const mapDBToModelChapter = ({
    id_chapter,
    no_chapter,
    tgl_chapter,
    isi_chapter,
    id_admin,
    id_novel,
  }) => ({
    id: id_chapter,
    nomor: no_chapter,
    tanggal: tgl_chapter,
    isi: isi_chapter,
    idAdmin: id_admin,
    idNovel: id_novel,
  });
  
  module.exports = { 
    mapDBToModelGenre, 
    mapDBToModelNovel, 
    mapDBToModelChapter, 
  };
  