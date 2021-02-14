import styled from 'styled-components/native';
import { Animated, Text } from 'react-native';

export const Container = styled(Animated.View)`
background: #4d4d4d;
width:100%;
align-content:center;
justify-content:center;
padding:0 10px;

`;

export const ContentArea = styled.View`
  display:flex;
  flex:1;
  align-items:center;
  justify-content:space-around;
  margin:40px;

`;
export const Title = styled(Text)`
  color: #fff;
  font-size:18px;
  text-align:center;
  margin:50px 0;
`;
export const ImageContent = styled.Image`
  width:87%;
  height:70%;
`;
export const DescriptionText = styled(Text)`
  color: #fff;
  font-size:14px;
  text-align:center;
  margin:80px 0;
`;
