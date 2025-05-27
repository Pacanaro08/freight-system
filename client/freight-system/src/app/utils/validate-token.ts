interface TokenResponse {
    message: string,
    code: number
}

async function validateToken(): Promise<TokenResponse> {

    try {
        const response = await fetch('http://127.0.0.1:8000/tokens/get-authenticated-tokens', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (data) {
            return { 'message': data.message, 'code': data.code };
        } else {
            return { 'message': 'Something went wrong. Try again later.', 'code': 500 };
        }
    } catch (error) {
        return { 'message': String(error), 'code': 500 };
    }
}

export { validateToken }