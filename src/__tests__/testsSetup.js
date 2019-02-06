import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Due to https://github.com/airbnb/enzyme/issues/1875
jest.mock('react', () => {
    const r = jest.requireActual('react');
  
    return { ...r, memo: (x) => x };
});

configure({ adapter: new Adapter() });