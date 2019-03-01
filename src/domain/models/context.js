import Dimension from './dimension';

class Context {
    constructor(id, dimensions, name) {
        // Context id MUST be uniq for this context
        // Combination of dimensions and name should be uniq for 
        // id cause some logic based on it
        this.id = id;
        this.dimensions = dimensions;
        this.name = name;
    }

    get label() {
        return this.name;
    }

    get value() {
        return this;
    }

    // TODO: Add automapper
    static fromObject(contextObject) {
        return new Context(
            contextObject.id,
            contextObject.dimensions.map(Dimension.fromObject),
            contextObject.name
        );
    }

    // TODO: Add automapper
    static fromImmutable(contextImmutable) {
        const context = new Context();
        context.id = contextImmutable.get('id');
        context.name = contextImmutable.get('name');
        context.dimensions = contextImmutable.get('dimensions').toArray().map(dim => Dimension.fromImmutable(dim, context));

        return context;
    }

    serialize() {
        return {
            id: this.id,
            name: this.name
        };
    }
}

export default Context;