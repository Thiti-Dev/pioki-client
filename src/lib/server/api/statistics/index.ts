import { PIOKI_Fetch } from "../../fetch";

export function getGeneralStatisticData(){
    return PIOKI_Fetch('http://localhost:8080/api/statistics/general',{
        headers: {'content-type': "application/json"},
        method: "GET"
    })    
  }