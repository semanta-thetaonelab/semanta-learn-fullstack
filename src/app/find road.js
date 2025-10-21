(()=>{
const start="D";
const end="A";
//z,x    
const pos={
    A:[3,-4],
    B:[3,-2],
    C:[3,-1],
    D:[3,0],
    E:[2,-3],
    F:[2,-2],
    G:[2,-1],
    H:[1,-4],
    I:[0,-4],
    J:[0,0]
};    
const connection = {
    A: ["H","B"],
    B: ["F","C"],
    C: ["G","D","B"],
    D: ["C"],
    E: ["H","F"],
    F: ["E","B","G"],
    G: ["F","C"],
    H: ["A","E","I"],
    I: ["H","J"],
    J: ["I"]
};
let road=[];
let reached=false;
const shortByClosestPoint=(points)=>{
    let keyPos={};
    points.map((key)=>{
        const distance = Math.sqrt(
           Math.pow(pos[key][0] - pos[start][0], 2) + Math.pow(pos[key][1] - pos[start][1], 2)
        );
        keyPos={...keyPos,[key]:distance}
        
    })
    let sortedEntries = Object.entries(keyPos).sort((a, b) => a[1] - b[1]);
    const returnkey=[]
    for (const arr of sortedEntries){
        returnkey.push(arr[0]);
    }
    console.log(returnkey)
    return returnkey;
}    
const findRoad=(current)=>{
    if(!reached || !road.includes(start)){
        
        (shortByClosestPoint(connection[current])).map((key)=>{
            if(road.includes(key) || key===end){
                if(key===end){
                 const index = road.indexOf(current);
                 road.splice(index , 0, key);   
                 // road.push(key),
                 console.log(`head push before ${current}`)
               }
                console.log(1,current,key,road,end)
                return
            }else if(key===start){
              reached=true;  
              console.log(2,current,key,end)
              road.push(key); 
            }else if(!road.includes(start) || !reached){
              console.log(3,current,key,end)  
              road.push(key);  
              findRoad(key);
            }
        })
    }
}
findRoad(end);
const lastIndex = road.lastIndexOf(end);
const result = road.slice(lastIndex); 
   
    
console.log(result);
})()

    


