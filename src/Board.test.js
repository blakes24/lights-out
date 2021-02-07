import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

it('renders without crashing', function() {
	render(<Board />);
});

it('matches snapshot', function() {
	const { asFragment } = render(<Board chanceLightStartsOn={1} />);
	expect(asFragment()).toMatchSnapshot();
});

it('works when you click on a cell', function() {
	const { queryByTestId } = render(<Board chanceLightStartsOn={1} />);

	// select corner cell
	const cell = queryByTestId('0-0');

	// all cells should be lit
	expect(cell.classList.contains('Cell-lit')).toBe(true);
	expect(queryByTestId('0-1').classList.contains('Cell-lit')).toBe(true);
	expect(queryByTestId('1-0').classList.contains('Cell-lit')).toBe(true);
	expect(queryByTestId('1-1').classList.contains('Cell-lit')).toBe(true);

	// click cell
	fireEvent.click(cell);

	// clicked cell and two adjacent cells should be dark, cell at diagonal still lit
	expect(cell.classList.contains('Cell-lit')).toBe(false);
	expect(queryByTestId('0-1').classList.contains('Cell-lit')).toBe(false);
	expect(queryByTestId('1-0').classList.contains('Cell-lit')).toBe(false);
	expect(queryByTestId('1-1').classList.contains('Cell-lit')).toBe(true);
});

it('shows winning message', function() {
	const { queryByTestId, queryByText } = render(<Board nrows={2} ncols={3} chanceLightStartsOn={1} />);

	expect(queryByText('You Won!!!')).not.toBeInTheDocument();

	// click cells to win game
	fireEvent.click(queryByTestId('0-0'));
	fireEvent.click(queryByTestId('1-2'));

	// shows winning message
	expect(queryByText('You Won!!!')).toBeInTheDocument();
});
