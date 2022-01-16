export function setLoggedUser(user: any){
    return {
        type: "NEW_USER",
        payload: user
    }
}