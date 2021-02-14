import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';

interface PointProps{
  showInfo: boolean;
}

export const Container = styled(Animated.View)`

`;
export const PointNotationContainer = styled.View`
background:transparent;
padding:5px;
justify-content:center;
align-items:center;
`;
export const PointNotationTextViewContainer = styled.View<PointProps>`
background:#444;
padding:5px;
justify-content:center;
align-items:center;
border-radius:6px;
display:none;
${(props) => props.showInfo && css`display: flex;`}
`;

export const PointTriangle = styled.View<PointProps>`

border-bottom-width: 0px;
border-left-width:5px;
border-top-width: 10px;
border-right-width: 5px;
border-bottom-color: transparent;
border-left-color:transparent;
border-right-color:transparent;
border-top-color: #444;
display:none;
${(props) => props.showInfo && css`display: flex;`}
`;
export const PointNotationText = styled.Text`
color: #fff;
font-weight:bold;
font-size: 10px;
text-align:center;

`;
