export const Post=async (url:string,data:any)=>{
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
          const resData = await response.json();
          if(response.ok){
            return {status:true,response:resData};
          }else{
            return {status:false,response:resData};
          }
    }catch(error){
        return {status:false}
    }finally{

    }

}