import React from 'react';
import { render } from '@testing-library/react-native';
import About from '../../pages/About';

jest.mock('@react-navigation/native', () => ({
  isFocused: () => true,
  useNavigation() {
    return {
      navigate: jest.fn(),
    };
  },
  useFocusEffect: () => jest.fn((cbk) => cbk()),
}));

describe('About - Page', () => {
  it('should render page', () => {
    const about = render(<About />);

    expect(about).toBeTruthy();
  });
});
