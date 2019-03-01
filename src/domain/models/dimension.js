import Field from './field';

class Dimension {
    constructor(dimensionName, fields, parentContext) {
        this.dimensionName = dimensionName;
        this.fields = fields;
        this.parentContext = parentContext;
    }

    get label() {
        return `${this.parentContext.label}.${this.dimensionName}`;
    }

    get value() {
        return this;
    }
    // TODO: Add automapper
    static fromObject(dimensionObject) {
        return new Dimension(dimensionObject.dimensionName, dimensionObject.fields);
    }
    // TODO: Add automapper
    static fromImmutable(dimensionImmutable, parentContext) {
        const dimension = new Dimension();

        dimension.dimensionName = dimensionImmutable.get('dimensionName');
        dimension.fields = dimensionImmutable.get('fields').toArray().map(field => new Field(field, dimension));
        dimension.parentContext = parentContext;
    
        return dimension;
    }

    serialize() {
        return {
            dimensionName: this.dimensionName,
            parentContextId: this.parentContext.id
        };
    }
}

export default Dimension;