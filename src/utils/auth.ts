// Simple password hashing utility (for demo purposes)
// In production, use a proper library like bcrypt

export class PasswordHasher {
  // Simple hash function (NOT for production use)
  static async hash(password: string): Promise<string> {
    // Create a simple hash using multiple iterations
    let hash = password
    for (let i = 0; i < 1000; i++) {
      hash = btoa(hash + i.toString()).split('').reverse().join('')
    }
    return hash
  }

  // Verify password against hash
  static async verify(password: string, hash: string): Promise<boolean> {
    const hashedPassword = await this.hash(password)
    return hashedPassword === hash
  }
}

// For demo purposes, we'll use a simpler approach
export class SimpleHasher {
  static hash(password: string): string {
    // Simple hash for demo (NOT secure for production)
    const saltedPassword = password + 'salt123'
    const encoded = btoa(saltedPassword)
    const reversed = encoded.split('').reverse().join('')
    console.log('SimpleHasher.hash - input:', password)
    console.log('SimpleHasher.hash - salted:', saltedPassword)
    console.log('SimpleHasher.hash - encoded:', encoded)
    console.log('SimpleHasher.hash - final hash:', reversed)
    return reversed
  }

  static verify(password: string, hash: string): boolean {
    const computedHash = this.hash(password)
    const isValid = computedHash === hash
    console.log('SimpleHasher.verify - input password:', password)
    console.log('SimpleHasher.verify - stored hash:', hash)
    console.log('SimpleHasher.verify - computed hash:', computedHash)
    console.log('SimpleHasher.verify - result:', isValid)
    return isValid
  }
}
