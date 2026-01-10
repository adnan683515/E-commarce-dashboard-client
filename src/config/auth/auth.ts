


// type user
export type TUser = {
    user: {
        _id: string,
        fullName: string,
        email: string,
        role: 'BUYER' | 'SELLER' | 'ADMIN',
        isEmailVerified: boolean,
        createdAt: string,
        updatedAt: string,
        _v: number
    }
    accessToken: string
}


// type auth
export type TAuth = {
    user: TUser | null,
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

// Login request type
export type LoginPayload = {
    email: string;
    password: string;
    loginAs?: "ADMIN";
};

