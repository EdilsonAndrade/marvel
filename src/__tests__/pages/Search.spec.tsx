import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Search from '../../pages/Search';

jest.mock('../../hooks/GetComics', () => ({
  useComics() {
    return {
      resetOffset: jest.fn(),
      getComicsByHeroName: jest.fn(),
    };
  },

}));

jest.mock('@react-navigation/native', () => ({
  isFocused: true,
  useNavigation() {
    return {
      navigate: jest.fn(),
    };
  },
  useRoute: () => ({
    route: {
      name: 'Comic',
    },
  }),
}));

describe('Search - Page', () => {
  it('should render page', () => {
    const search = render(<Search />);

    expect(search).toBeTruthy();
  });

  it('should change input text', () => {
    const { getByPlaceholderText } = render(<Search />);
    const searchAreaText = getByPlaceholderText('Type your favorite hero');

    fireEvent.changeText(searchAreaText, 'hulk');

    expect(searchAreaText.props.value).toEqual('hulk');
  });

  it('should show search area field', async () => {
    const search = render(<Search />);
    const searchAreaText = search.getByPlaceholderText('Type your favorite hero');
    const buttonSearch = search.getByTestId('buttonSearch');
    fireEvent.changeText(searchAreaText, 'hulk');

    fireEvent.press(buttonSearch);
    expect(searchAreaText).toBeTruthy();
  });

  it('should show logo', () => {
    const search = render(<Search />);

    const buttonShowLogo = search.getByTestId('buttonShowLogo');

    fireEvent.press(buttonShowLogo);
    expect(buttonShowLogo).toBeTruthy();
  });
});
