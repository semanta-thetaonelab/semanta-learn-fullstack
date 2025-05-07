

const followers=[];
const numFollowers=1128;
const fn=async(next_max_id)=>{
    
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
                console.log(followers.length);
                setTimeout(()=>{
                    fn(data.next_max_id)
                },1000)
            }else{
                console.log(followers);
            }
        }
}
fn();