function roleDetector(role)
{
    return role === 'A' ? 'Admin' : role === 'S' ? 'Seller' : role === 'B' ? 'Buyer' : null
}

export { roleDetector }