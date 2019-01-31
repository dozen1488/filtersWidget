class Dimension {
    constructor(dimensionName, fields) {
        this.dimensionName = dimensionName;
        this.fields = fields;
    }

    get label() {
        return this.dimensionName;
    }

    get value() {
        return this;
    }
    // TODO: Add automapper
    static fromObject(dimensionObject) {
        return new Dimension(dimensionObject.dimensionName, dimensionObject.fields);
    }
    // TODO: Add automapper
    static fromImmutable(dimensionImmutable) {
        return new Dimension(
            dimensionImmutable.get('dimensionName'),
            dimensionImmutable.get('fields').toJS(),
        );
    }
}

export default Dimension;