interface TokenResponse {
    message: string,
    code: number,
    user?: string,
    company?: string,
    companyName?: string,
    branch?: string,
    branchName?: string,
}

export default TokenResponse