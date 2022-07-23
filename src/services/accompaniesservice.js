import HttpService from "./httpservice";

let _singleton: boolean = true;
let _instance: AccompaniesService;
class AccompaniesService {
    
    CREATE = "team/accompanies/create"
    DELETE = "team/accompanies"
    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use AccompaniesService.instance instead!');
        }        
    }

    static get instance(): AccompaniesService {
        if (!_instance) {
            _singleton = false;
            _instance = new AccompaniesService();
            _singleton = true;
        }
        return _instance;
    }

    async create(participant){
        return await HttpService.instance.post(this.CREATE, participant);
    }
    async delete(participant){
        return await HttpService.instance.delete(this.DELETE, participant);
    }
}

export default AccompaniesService;