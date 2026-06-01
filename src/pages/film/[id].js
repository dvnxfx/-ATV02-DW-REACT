import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function DetalheFilme() {
  const router = useRouter();
  const { id } = router.query; 

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (id) {
      const buscarDetalhes = async () => {
        try {
          const resposta = await axios.get(`/api/film?id=${id}`);
          setFilme(resposta.data);
        } catch (erro) {
          console.error('Erro ao buscar', erro);
        } finally {
          setCarregando(false);
        }
      };
      buscarDetalhes();
    }
  }, [id]);

  if (carregando) {
    return (
      <div className="pandora-container">
        <p className="lead" style={{ textAlign: 'center' }}>Acessando o banco de dados principal...</p>
      </div>
    );
  }

  if (!filme) {
    return (
      <div className="pandora-container">
        <p className="lead" style={{ textAlign: 'center' }}>Filme não encontrado no sistema.</p>
      </div>
    );
  }

  return (
    <div className="pandora-container">
      <Link href="/" className="back-link">
        🔙 Retroceder
      </Link>

      <main className="neubrutal-box1">
        <h1 className="pandora-title" style={{ marginBottom: '2rem' }}>{filme.Title}</h1>
        
        {}
        <img 
          src={filme.Poster} 
          alt={filme.Title} 
          style={{ 
            width: '100%', 
            maxWidth: '350px', 
            border: 'var(--border-thick)', 
            boxShadow: 'var(--shadow)',
            borderRadius: 'var(--radius)',
            marginBottom: '2rem'
          }} 
        />
        
        <div className="code-section" style={{ textAlign: 'left' }}>
          <h2>DADOS_DO_ARQUIVO.TXT</h2>
          <p><strong>[NOTA_IMDB]:</strong> ⭐ {filme.imdbRating}</p>
          <p><strong>[PREMIOS]:</strong> 🏆 {filme.Awards}</p>
          <p><strong>[DIRETOR]:</strong> 🎬 {filme.Director}</p>
          <p><strong>[LANCAMENTO]:</strong> 📅 {filme.Released}</p>
          <p><strong>[GENERO]:</strong> 📼 {filme.Genre}</p>
        </div>
      </main>
    </div>
  );
}