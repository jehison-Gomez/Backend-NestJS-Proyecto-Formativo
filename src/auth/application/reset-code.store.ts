import { Injectable } from '@nestjs/common';

interface ResetEntry {
  code: string;
  expiresAt: Date;
  verified: boolean;
}

@Injectable()
export class ResetCodeStore {
  private readonly codes = new Map<string, ResetEntry>();

  set(correo: string, code: string): void {
    this.codes.set(correo.toLowerCase(), {
      code,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
      verified: false,
    });
  }

  verify(correo: string, code: string): boolean {
    const entry = this.codes.get(correo.toLowerCase());
    if (!entry) return false;
    if (entry.expiresAt < new Date()) {
      this.codes.delete(correo.toLowerCase());
      return false;
    }
    if (entry.code !== code) return false;
    // Marca como verificado para que pueda restablecer sin reenviar el código
    entry.verified = true;
    return true;
  }

  isVerified(correo: string): boolean {
    const entry = this.codes.get(correo.toLowerCase());
    return !!entry && entry.verified && entry.expiresAt >= new Date();
  }

  delete(correo: string): void {
    this.codes.delete(correo.toLowerCase());
  }
}
