import GenericDAO from "./GenericDAO";

class ComponentDAO extends GenericDAO{
    constructor(){
        super("/api/v1/components");
    }
}

export default new ComponentDAO