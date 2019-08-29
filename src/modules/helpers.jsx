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

export { getTimeOfDay };