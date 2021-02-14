import React from 'react';
import { render } from '@testing-library/react-native';
import ComicsList from '../../pages/ComicsList';

jest.mock('@react-navigation/native', () => ({
  useNavigation() {
    return {
      navigate: jest.fn(),
    };
  },
  useRoute: jest.fn(),
}));

describe('Comics List - Page', () => {
  it('should render page', () => {
    const about = render(<ComicsList />);

    expect(about).toBeTruthy();
  });
});
