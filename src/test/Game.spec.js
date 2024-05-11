import { fireEvent, render } from '@testing-library/react';
import Board from '../components/Board';

describe("testing Game functionality",() => {
    it("should declare the winner",() => {
        const {getByTestId, getAllByTestId} = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[0]);
        fireEvent.click(squareComponents[1]);
        fireEvent.click(squareComponents[3]);
        fireEvent.click(squareComponents[4]);
        fireEvent.click(squareComponents[6]);
        const statusDiv = getByTestId('status-text');
        expect(statusDiv).toHaveTextContent('Winner is: X');
    });

    it("should declare Match as draw, when turns are over",() => {
        const {getByTestId, getAllByTestId} = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[0]);
        fireEvent.click(squareComponents[1]);
        fireEvent.click(squareComponents[3]);
        fireEvent.click(squareComponents[4]);
        fireEvent.click(squareComponents[5]);
        fireEvent.click(squareComponents[6]);
        fireEvent.click(squareComponents[2]);
        fireEvent.click(squareComponents[8]);
        fireEvent.click(squareComponents[7]);
        const statusDiv = getByTestId('status-text');
        expect(statusDiv).toHaveTextContent('Match is Draw');
    });
});