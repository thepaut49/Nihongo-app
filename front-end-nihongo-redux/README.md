Front end react qui utilise Redux

@wojtekmaj/enzyme-adapter-react-17
Unofficial adapter for React 17 for Enzyme.

Installation
npm install --save-dev @wojtekmaj/enzyme-adapter-react-17
or, if you're using Yarn:

yarn add --dev @wojtekmaj/enzyme-adapter-react-17
Configuration
Finally, you need to configure enzyme to use the adapter you want it to use. To do this, you can use the top level configure(...) API.

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
