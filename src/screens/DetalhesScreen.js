import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function DetalhesScreen({ route }) {
  const { id, nome } = route.params;

  const [episodios, setEpisodios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarEpisodios() {
      try {
        const resposta = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);

        if (!resposta.ok) {
          throw new Error('Erro na requisição');
        }

        const dados = await resposta.json();
        setEpisodios(dados);
      } catch (e) {
        setErro('Não foi possível carregar os episódios.');
      } finally {
        setCarregando(false);
      }
    }

    buscarEpisodios();
  }, [id]);

  function renderizarEpisodio({ item }) {
    return (
      <View style={styles.episodio}>
        <Text style={styles.temporada}>
          Temporada {item.season} - Episódio {item.number}
        </Text>
        <Text style={styles.nomeEpisodio}>{item.name}</Text>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Carregando episódios...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>
      <FlatList
        data={episodios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarEpisodio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: 'red',
    fontSize: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  episodio: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  temporada: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  nomeEpisodio: {
    fontSize: 16,
    marginTop: 4,
  },
});
