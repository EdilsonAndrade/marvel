import React, {
  useRef, useMemo, useEffect, useCallback,
} from 'react';
import { Animated, ImageProps, ListRenderItem } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Print1 from '../../assets/images/print1.png';
import Print2 from '../../assets/images/print2.png';
import Print3 from '../../assets/images/print3.png';
import {
  Container, ContentArea, Title, ImageContent, DescriptionText,
} from './styles';

type Slides ={
  key:string;
  title:string;
  text:string;
  image:ImageProps;
}
const About: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<AppIntroSlider>(null);
  const { navigate } = useNavigation();

  const data = useMemo(() => (
    [{
      key: '1',
      image: Print1,
      title: 'Favorite hero',
      text: 'Search by typing a hero at top of the screen',
    },
    {
      key: '2',
      image: Print2,
      title: 'Scroll to bring more data',
      text: 'You can see as much as possible comics from your favorite hero',
    },
    {
      key: '3',
      image: Print3,
      title: 'Nearby store',
      text: 'Find nearby comic stores',
    }]
  ), []);

  useFocusEffect(useCallback(() => {
    sliderRef.current?.goToSlide(0);
  }, []));

  const handlefadeAnim = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    handlefadeAnim();
  }, [handlefadeAnim]);

  const handleRenderItem: ListRenderItem<Slides> = ({ item }) => (
    <ContentArea key={item.key}>
      <Title>
        {item.title}
      </Title>
      <ImageContent source={item.image} />
      <DescriptionText>
        {item.text}
      </DescriptionText>
    </ContentArea>
  );

  return (
    <>
      <Container style={{
        flex: fadeAnim,
      }}
      >
        <AppIntroSlider ref={sliderRef} data={data} renderItem={handleRenderItem} onDone={() => navigate('Comic')} />

      </Container>

    </>
  );
};

export default About;
