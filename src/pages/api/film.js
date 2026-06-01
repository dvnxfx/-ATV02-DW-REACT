import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { q } = req.query;
  const token = process.env.TMDB_TOKEN;

  try {
    // Busca na API da TMDB
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });

    const dadosFormatados = {
      Search: response.data.results.map(filme => ({
        imdbID: filme.id,
        Title: filme.title,
        Year: filme.release_date ? filme.release_date.split('-')[0] : 'N/A',
        Poster: filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'N/A'
      }))
    };

    return res.status(200).json(dadosFormatados);

  } catch (error) {
    console.error("Erro na API TMDB:", error.response?.data || error.message);
    return res.status(500).json({ error: 'Erro ao buscar dados na TMDB' });
  }
}