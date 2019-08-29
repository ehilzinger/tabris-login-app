import { drawer } from 'tabris';
function getTimeOfDay(hours)    {
    if(hours <= 5) {
    return "Night";
    }
    if(hours <= 12) {
        return "Morning";
    }
    if(hours<=18){
        return "Afternoon";
    }
    if(hours<=23){
        return "Evening";
    }
}

function logout()   {
    drawer.enabled = false;
    localStorage.clear();
}

export { getTimeOfDay, logout };
