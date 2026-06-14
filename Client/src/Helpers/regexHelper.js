export function isEmailValid(string){
    return string.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

export function isPasswordValid(password){
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}