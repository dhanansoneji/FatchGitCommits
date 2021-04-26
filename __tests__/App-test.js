/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render, FindAllReturn} from '@testing-library/react-native';

jest.useFakeTimers();
it('renders correctly', () => {
  expect(renderer.create(<App />)).toMatchSnapshot();
});

it('children length', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree.children.length).toBe(3);
});

it('renders default elements', () => {
  const {getAllByText} = render(<App />);

  expect(getAllByText('Fetch Git Commits').length).toBe(1);
});
