import Select from 'react-select';
import { returnUndefinedFunction } from '../../helpers/helperFunctions';

// Removing default style-based styles
// We will use class-based styling
const modifiedStyles = {
    clearIndicator: returnUndefinedFunction,
    container: returnUndefinedFunction,
    control: returnUndefinedFunction,
    dropdownIndicator: returnUndefinedFunction,
    group: returnUndefinedFunction,
    groupHeading: returnUndefinedFunction,
    indicatorsContainer: returnUndefinedFunction,
    indicatorSeparator: returnUndefinedFunction,
    input: returnUndefinedFunction,
    loadingIndicator: returnUndefinedFunction,
    loadingMessageCSS: returnUndefinedFunction,
    menu: returnUndefinedFunction,
    menuList: returnUndefinedFunction,
    menuPortal: returnUndefinedFunction,
    multiValue: returnUndefinedFunction,
    multiValueLabel: returnUndefinedFunction,
    multiValueRemove: returnUndefinedFunction,
    noOptionsMessageCSS: returnUndefinedFunction,
    option: returnUndefinedFunction,
    placeholder: returnUndefinedFunction,
    singleValue: returnUndefinedFunction,
    valueContainer:  returnUndefinedFunction,
};

Select.defaultProps.styles = modifiedStyles;

export default Select;