import { PIOKI_Fetch } from "../../fetch";

export function getGeneralStatisticData(){
    return PIOKI_Fetch('/api/statistics/general',{
        headers: {'content-type': "application/json"},
        method: "GET"
    })    
  }