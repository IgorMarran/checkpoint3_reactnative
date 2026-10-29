import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/shows');

        if (!resposta.ok) {
          throw new Error('Erro na requisição');
        }

        const dados = await resposta.json();
        setSeries(dados);
      } catch (e) {
        setErro('Não foi possível carregar as séries.');
      } finally {
        setCarregando(false);
      }
    }

    buscarSeries();
  }, []);

  function abrirDetalhes(serie) {
    navigation.navigate('Detalhes', { id: serie.id, nome: serie.name });
  }

  function renderizarSerie({ item }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => abrirDetalhes(item)}>
        {item.image ? (
          <Image source={{ uri: item.image.medium }} style={styles.imagem} />
        ) : (
          <View style={styles.semImagem}>
            <Text>Sem imagem</Text>
          </View>
        )}
        <Text style={styles.nome}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Carregando séries...</Text>
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
    <FlatList
      data={series}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderizarSerie}
    />
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: 'red',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  imagem: {
    width: 60,
    height: 85,
    borderRadius: 4,
  },
  semImagem: {
    width: 60,
    height: 85,
    borderRadius: 4,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
  },
});
