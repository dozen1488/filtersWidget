export default class Field {
    constructor(field, parentDimension) {
        this.field = field;
        this.parentDimension = parentDimension;
    }

    get label() {
        return `${this.parentDimension.label}.${this.field}`;
    }

    get value() {
        return this;
    }

    serialize() {
        return {
            field: this.field,
            parentDimensionName: this.parentDimension.dimensionName,
            contextId: this.parentDimension.parentContext.id
        };
    }
}