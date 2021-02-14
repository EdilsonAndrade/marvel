import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  ListRenderItem,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import NumberFormat from 'react-number-format';

import {
  Container,
  ListContent, IssueContent, TitleContent, PriceContent, ImageContent,
} from './styles';
import { IComic, useComics } from '../../hooks/GetComics';

type ComicList= {
  Detail:{
    hero:string;
  }
}
const ComicsList: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ComicList, 'Detail'>>();
  const {
    comics, loading, getComicsByHeroName,
  } = useComics();

  const handleRenderItem:ListRenderItem<IComic> = useCallback(({ item }) => (
    <ListContent key={item.id}>
      <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('StoreMap')}>
        <IssueContent>
          Issue:
          {item.issueNumber}
        </IssueContent>
        <ImageContent source={{ uri: item.transformedUrlImage ? item.transformedUrlImage : 'http://i.annihil.us/u/prod/marvel/i/mg/9/10/5b241ee9b1b64/portrait_medium.jpg' }} />
        <TitleContent>{item.title}</TitleContent>
        <NumberFormat value={item.prices[0].price} decimalScale={2} fixedDecimalScale decimalSeparator="." thousandSeparator prefix="$ " displayType="text" renderText={(value) => <PriceContent>{value}</PriceContent>} />
      </TouchableOpacity>
    </ListContent>
  ), [navigation]);

  const handleGetmoreItens = async () => {
    const { hero } = route.params;
    await getComicsByHeroName(hero);
  };

  return (
    <Container>

      <FlatList
        testID="flatList"
        data={comics}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading) {
            handleGetmoreItens();
          }
        }}
        keyExtractor={(item) => item.id}
        renderItem={handleRenderItem}
        ListFooterComponent={() => (loading ? <ActivityIndicator size={52} color="#fff" /> : null)}
      />

    </Container>
  );
};

export default ComicsList;
