import GenericDAO from "./GenericDAO";

class EnviromentalDAO extends GenericDAO{
    constructor(){
        super("/api/v1/environments");
    }
}

export default new EnviromentalDAO();