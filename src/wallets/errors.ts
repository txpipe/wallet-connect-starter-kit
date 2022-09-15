class WalletNotEnabledError extends Error {
    constructor() {
        super('wallet not enabled');
    }
}

class WalletNotAvailableError extends Error {
    constructor() {
        super('wallet not available');
    }
}

export {
    WalletNotEnabledError,
    WalletNotAvailableError,
} 