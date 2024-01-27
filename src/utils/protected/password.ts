import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (enteredPassword: string, existPassword: string): Promise<boolean> => {
    return await bcrypt.compare(enteredPassword, existPassword);
}