import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; 
import Card from '../components/Card';     
import styles from '../styles/Home.module.css';

export default function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const [listaFilmes, setListaFilmes] = useState([]);
  const [erro, setErro] = useState('');

  const buscarFilmes = async (e) => {
    e.preventDefault();
    setErro('');
    
    try {
      const resposta = await axios.get(`/api/film?q=${pesquisa}`);
      
      if (!resposta.data.Search || resposta.data.Search.length === 0) {
        setErro('Nenhum filme encontrado na base de dados.');
        setListaFilmes([]);
        return;
}
      
      setListaFilmes(resposta.data.Search); 
    } catch (err) {
      setErro('Erro ao buscar dados na API.');
      setListaFilmes([]);
    }
  };

  return (
    <div className={styles.page}>
      

      <Header />

      <main className={styles.main}>
        <div className={styles.intro}>
          <form onSubmit={buscarFilmes} className={styles.formContainer}>
            <input 
              type="text" 
              value={pesquisa} 
              onChange={(e) => setPesquisa(e.target.value)} 
              placeholder="Digite o nome do filme..."
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Pesquisar
            </button>
          </form>
        </div>

        {erro && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{erro}</p>}

        <div className={styles.pandoraLinks}>
          {listaFilmes.map((filme) => (
            <Card key={filme.imdbID} filme={filme} />
          ))}
        </div>
        
      </main>
    </div>
  );
}