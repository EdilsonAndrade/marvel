import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
background: #4d4d4d;
flex:1;
`;
export const Content = styled.Text`
color: #fff;
font-size:25px;
`;
export const LoadingContent = styled.View`
flex:1;
display:flex;
justify-content:center;
align-items:center;
`;

export const ListContent = styled.View`
padding: 4px;
border:1px solid #f0131d;
border-radius:6px;
width:50%;
display:flex;
justify-content:center;

`;

export const IssueContent = styled.Text`
padding:2px;
color: #fff;
background: #f0131d;
font-size: 16px;
text-align:right;
border-radius:4px;
`;

export const PriceContent = styled.Text`
color: #4d4d4d;
font-size: 14px;
text-align:right;
background:#F4EDE8;
border-radius:2px;
padding:2px;
font-weight:bold;

`;
export const TitleAndImagemContainer = styled.View`
  display:flex;
  flex-direction:row;

`;
export const TitleContent = styled.Text`
color: #fff;
background:#4d4d4d;
font-size: 12px;
border-radius:1px;
height:54px;
text-align:center;
text-transform:capitalize;
border-radius:2px;
padding:2px;
display:flex;
justify-content:center;
align-items:center;
`;

export const ImageContent = styled.Image`
width:100%;
max-width:198px;
height: 282px;


`;
