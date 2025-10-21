

const followers=[];
const following=[];
const unfollowers=[];
const numFollowing=1128;
const numFollowers=1132;
let len=0;
let max_id=12;
const unfollowersFind=()=>{
     following.map((data1)=>{
       if(!followers.find((data2)=>data2.username===data1.username)){
         unfollowers.push(data1.username);
       }
       console.log(unfollowers,'unfollowers')
     });
}
const fetchFollowings=async()=>{
  const res = await fetch(max_id===12?'https://www.instagram.com/api/v1/friendships/7750945443/following/?count=12':`https://www.instagram.com/api/v1/friendships/7750945443/following/?count=12&max_id=${max_id}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "priority": "u=1, i",
      "sec-ch-prefers-color-scheme": "light",
      "sec-ch-ua": "\"Chromium\";v=\"136\", \"Microsoft Edge\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
      "sec-ch-ua-full-version-list": "\"Chromium\";v=\"136.0.7103.49\", \"Microsoft Edge\";v=\"136.0.3240.50\", \"Not.A/Brand\";v=\"99.0.0.0\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": "\"\"",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-ch-ua-platform-version": "\"10.0.0\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-asbd-id": "359341",
      "x-csrftoken": "GP6Gc6Lt6AQLumLD14bq4PFLGG0PWU9K",
      "x-ig-app-id": "936619743392459",
      "x-ig-www-claim": "hmac.AR3W1hBW7deEtzGw95vx7-RDm_SxZEQJWY44M-YXXp5PNe60",
      "x-requested-with": "XMLHttpRequest",
      "x-web-session-id": "aheufi:d4pj7s:drimo2"
    },
    "referrer": "https://www.instagram.com/user_name_jaruri_hai_keya/following/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  });
  if(res.ok){
    const data= await res.json();
    following.push(...data.users);
    max_id=max_id+12;
    if(following.length!==len){
      len=following.length;
      console.log(following.length,'Number of following fetch');
      fetchFollowings();
    }else{
      unfollowersFind();
      console.log(following,'following');
    }
  }
}

const fetchFollowers=async(next_max_id)=>{
    
const res = await fetch(next_max_id?`https://www.instagram.com/api/v1/friendships/7750945443/followers/?count=24&max_id=${next_max_id}&search_surface=follow_list_page`:'https://www.instagram.com/api/v1/friendships/7750945443/followers/?count=24&search_surface=follow_list_page', {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "priority": "u=1, i",
    "sec-ch-prefers-color-scheme": "light",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Microsoft Edge\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-full-version-list": "\"Chromium\";v=\"136.0.7103.49\", \"Microsoft Edge\";v=\"136.0.3240.50\", \"Not.A/Brand\";v=\"99.0.0.0\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"10.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-asbd-id": "359341",
    "x-csrftoken": "GP6Gc6Lt6AQLumLD14bq4PFLGG0PWU9K",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR3W1hBW7deEtzGw95vx7-RDm_SxZEQJWY44M-YXXp5PNe60",
    "x-requested-with": "XMLHttpRequest",
    "x-web-session-id": "k7jjqp:d4pj7s:drimo2"
  },
  "referrer": "https://www.instagram.com/user_name_jaruri_hai_keya/followers/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
        if(res.ok){
           const data= await res.json();
           followers.push(...data?.users);
            // console.log(followers);
            if(followers.length<=numFollowers){
                console.log(followers.length,'Number of followers fetch');
                setTimeout(()=>{
                  fetchFollowers(data.next_max_id)
                },1000)
            }else{
                fetchFollowings();
                console.log(followers,'followers');
            }
        }
}
fetchFollowers();

fetch("https://www.instagram.com/api/v1/friendships/destroy/57900224605/", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
    "priority": "u=1, i",
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
    "sec-ch-ua-full-version-list": "\"Chromium\";v=\"140.0.7339.214\", \"Not=A?Brand\";v=\"24.0.0.0\", \"Google Chrome\";v=\"140.0.7339.214\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-ch-ua-platform-version": "\"15.6.1\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-asbd-id": "129477",
    "x-csrftoken": "2BPGojXH9F0w6AjV2yI2wK6S35XupZBl",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR3W1hBW7deEtzGw95vx7-RDm_SxZEQJWY44M-YXXp5PNT9u",
    "x-instagram-ajax": "1028143599",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://www.instagram.com/user_name_jaruri_hai_keya/?ext=TF&uuid=d2b1941c-cd16-4244-9ffb-3dc86edbc08d",
  "body": null,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
