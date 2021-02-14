import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  Animated, TouchableOpacity, TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MarvelImage from '../../assets/images/screen.png';
import {
  Container, TitleAndLogoContent, ImageMarvel, TitleText, SearchAreaContent, SearchAreaText,
} from './styles';
import { useComics } from '../../hooks/GetComics';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [showLogo, setShowLogo] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  const hideLogoShowSearch = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const { getComicsByHeroName, resetOffset } = useComics();
  const inputRef = useRef<TextInput>(null);
  const fadeIn = useRef(new Animated.Value(1)).current;

  const handleShowHeader = useCallback(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    handleShowHeader();
  }, [handleShowHeader]);

  const handleClickSearch = async () => {
    if (searchText.length > 0) {
      resetOffset();
      await getComicsByHeroName(searchText);
    }
    if (route.name !== 'Comic') {
      navigation.navigate('Comic', { hero: searchText });
    }
  };

  useEffect(() => {
    if (route.name === 'Comic') {
      setShowLogo(false);
      setShowSearch(true);
      Animated.timing(hideLogoShowSearch, {
        toValue: 250,
        duration: 700,
        useNativeDriver: false,
      }).start();

      inputRef.current?.focus();
    }
  }, [route.name]);
  const handleShowLogo = useCallback(() => {
    handleShowHeader();
    navigation.navigate('AboutNavigation');
  }, []);

  const handleSearch = async () => {
    if (searchText && searchText.length >= 3) {
      navigation.setParams({ hero: searchText });
      await getComicsByHeroName(searchText);
    }
  };

  return (
    <Container
      style={{
        opacity: fadeIn,
      }}
    >
      <TouchableOpacity testID="buttonShowLogo" onPress={handleShowLogo}>
        <Icon name="info" size={32} color="#fff" />
      </TouchableOpacity>
      <TitleAndLogoContent showMe={!showLogo}>
        <ImageMarvel source={MarvelImage} />
        <TitleText>App Explorer</TitleText>
      </TitleAndLogoContent>

      <SearchAreaContent
        style={showSearch ? {
          transform: [
            {
              scale: hideLogoShowSearch.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1],
              }),
            },
          ],
          opacity: fadeIn,
          display: 'flex',
          width: hideLogoShowSearch,

        } : {
          transform: [
            {
              scale: hideLogoShowSearch.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],

              }),
            },
          ],
          opacity: fadeIn,
          display: 'none',

        }}
      >

        <SearchAreaText
          placeholderTextColor="#f0131d"
          placeholder="Type your favorite hero"
          ref={inputRef}
          searchVisible={showSearch}
          autoCorrect={false}
          onSubmitEditing={handleSearch}
          onChangeText={(text) => {
            resetOffset();
            setSearchText(text);
          }}
          value={searchText}
        />

      </SearchAreaContent>
      <TouchableOpacity testID="buttonSearch" onPress={handleClickSearch}>
        <Icon name="search" size={32} color="#fff" />
      </TouchableOpacity>

    </Container>
  );
};

export default Search;
