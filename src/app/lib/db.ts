const {username,password}=process.env
export const connectStr="mongodb+srv://"+username+":"+password+"@cluster0.y7ddzwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"