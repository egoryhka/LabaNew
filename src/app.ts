import myRequest from "./utils/request";

interface initState {
    user?: any,
}

export async function getInitialState(): Promise<initState | null> {
    let user;
    try {
        user = await myRequest("/Service/GetUser");
        console.log(user);
    }
    catch (error) {
        console.log(error);
    }
    return { user };
}