import HttpService from "./httpservice";

let _singleton: boolean = true;
let _instance: TeamService;
class TeamService {
    
    CREATE = "team/create";
    GET_TEAM ="admin/teams/get"
    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use TeamService.instance instead!');
        }        
    }

    static get instance(): TeamService {
        if (!_instance) {
            _singleton = false;
            _instance = new TeamService();
            _singleton = true;
        }
        return _instance;
    }

    async create(team){
        return await HttpService.instance.post(this.CREATE, team);
    }
    async getTeam(token){
        return await HttpService.instance.get(this.GET_TEAM +'?token='+token );
    }
}

export default TeamService;