import { Info } from './Info';
import { render, screen } from '@testing-library/react';
import * as data from './testdata.js';
import * as utility from './utility'; // library tested

test('Info control display with opened with no expected closure', () => {
    debugger;

    const status = data.openedWithNOExpectedNextClosure();
    const style = utility.getStyle(status);

    render(<Info value={status} style={style} />);
    const linkElement = screen.getByText(/60 m/i);
    expect(linkElement).toBeInTheDocument();

  });
