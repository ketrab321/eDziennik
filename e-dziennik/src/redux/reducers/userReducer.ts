export function userReducer(user: any = null, action: any) {
    if(action.type === "NEW_USER"){
        return action.payload
    }
    return user
}

