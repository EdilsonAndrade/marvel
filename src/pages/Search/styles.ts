import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';

interface SearchProps{
  showMe?: boolean;
  searchVisible?: boolean;
}
export const Container = styled(Animated.View)`
 flex-direction: row;
 width: 100%;
 align-items: center;
 justify-content: space-between;
 background: #f0131d;
 padding:10px;
`;

export const TitleAndLogoContent = styled(Animated.View)<SearchProps>`
flex-direction: row;
align-items: center;
 justify-content: space-between;
 height:60px;
 display:flex;
${(props) => props.showMe && css`display:none;`}
`;
export const ImageMarvel = styled.Image`
width: 60px;
height:60px;
`;
export const TitleText = styled.Text`
color:#fff;
font-size:15px;
`;

export const SearchAreaContent = styled(Animated.View)`
height:60px;
width:70%;

`;
export const SearchAreaText = styled.TextInput<SearchProps>`


${(props) => props.searchVisible
&& css`
background:#eee;
border-radius: 6px;
font-size:16px;
color: #444;
display: none;
padding:15px;
  display:flex;
`}
`;
