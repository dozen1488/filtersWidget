import { SelectBase } from 'react-select';
import manageState from 'react-select/lib/stateManager';

import { hocSelectBaseModifier } from '../hocSelectBaseModifier';

export default manageState(hocSelectBaseModifier(SelectBase));