import {shallow} from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
import Board from '../components/Board';

describe("Basic rendering of Board component",() => {
    it("should render Board component",() => {
        const boardComponent = shallow(<Board />);
        expect(boardComponent.exists()).toBe(true);
    });

    it("should have an initial state as X's turn",() => {
        const statusText = "Next Player is: X";
        const boardComponent = shallow(<Board />);
        const statusDiv = boardComponent.find('.status-text');
        expect(statusDiv.text()).toEqual(statusText);

        //const { getByTestId } = render(<Board />);
        //const statusDiv = getByTestId('status-text');
        //expect(statusDiv).toHaveTextContent(statusText);
    });

    it("should render Board component with 9 Square component",() => {
        const { getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        expect(squareComponents.length).toBe(9);
    });
});

describe("testing Board component functionality",() => {
    it("should display the name of the player on square, when square is clicked",() => {
        const { getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[0]);
        expect(squareComponents[0]).toHaveTextContent('X');
    });

    it("should alter the turns",() => {
        const { getByTestId, getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        let statusDiv = getByTestId('status-text');

        //initial state
        expect(statusDiv).toHaveTextContent('Next Player is: X');

        //X's turn
        fireEvent.click(squareComponents[0]);
        expect(squareComponents[0]).toHaveTextContent('X');
        expect(statusDiv).toHaveTextContent('Next Player is: O');

        //O's turn
        fireEvent.click(squareComponents[3]);
        expect(squareComponents[3]).toHaveTextContent('O');
        expect(statusDiv).toHaveTextContent('Next Player is: X');
    });

    it("should not modify the square, when the square is already clicked",() => {
        const { getAllByTestId } = render(<Board />);
        const squareComponents = getAllByTestId('square');
        fireEvent.click(squareComponents[1]);
        expect(squareComponents[1]).toHaveTextContent('X');

        //try to click the same square
        fireEvent.click(squareComponents[1]);
        expect(squareComponents[1]).toHaveTextContent('X');
    });
});