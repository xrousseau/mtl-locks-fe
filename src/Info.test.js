import { Info } from './Info';
import { render, screen } from '@testing-library/react';
import * as data from '../__test__/testdata.js';
import {colors, getStyle}  from './utility';

test('Info control display with opened with no expected closure', () => {
  const status = data.openedWithNOExpectedNextClosure();
  const style = getStyle(status);

  render(<Info value={status} style={style} />);

    // remaining time in mins
  const remaining = screen.getByTestId('remaining');
  expect(remaining).toHaveStyle(`color: ${colors.BLUE}`);
  expect(remaining.innerHTML).toEqual(`${status.openedMinutesRemaining} m`);

  // icon go
  const icon = screen.getByTestId('icon');
  expect(icon).toHaveAttribute('src', 'icon-go.svg');

  // extra info
  const extraInfo = screen.getByTestId('extraInfo');
  expect(extraInfo.innerHTML).toEqual('');

});

test('Info control display with an announced closure', () => {
  const status = data.openedWithAnExpectedNextClosure();
  const style = getStyle(status);

  render(<Info value={status} style={style} />);

    // remaining time in mins
  const remaining = screen.getByTestId('remaining');
  expect(remaining).toHaveStyle(`color: ${colors.ORANGE}`);
  expect(remaining.innerHTML).toEqual(`${status.openedMinutesRemaining} m`);

  // icon go
  const icon = screen.getByTestId('icon');
  expect(icon).toHaveAttribute('src', 'icon-attention.svg');

  // extra info
  const extraInfo = screen.getByTestId('extraInfo');
  expect(extraInfo.innerHTML).toEqual('');
  
});

test('Info control displaying a closure', () => {
  const status = data.closed();
  const style = getStyle(status);

  render(<Info value={status} style={style} />);

    // remaining time in mins
  const remaining = screen.getByTestId('remaining');
  expect(remaining).toHaveStyle(`color: ${colors.RED}`);
  expect(remaining.innerHTML).toEqual(`${status.openedMinutesRemaining} m`);

  // icon go
  const icon = screen.getByTestId('icon');
  expect(icon).toHaveAttribute('src', 'icon-stop.svg');

  // extra info
  const extraInfo = screen.getByTestId('extraInfo');
  expect(extraInfo.innerHTML).toEqual(status.extraInfo);
  
});