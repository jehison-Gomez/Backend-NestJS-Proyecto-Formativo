import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

interface TenantStore {
  centroId: string | null;
}

@Injectable()
export class TenantContext {
  private readonly store = new AsyncLocalStorage<TenantStore>();

  /** Retorna el centroId del tenant activo en la request actual. */
  getCentroId(): string | null {
    return this.store.getStore()?.centroId ?? null;
  }

  /** Ejecuta fn dentro del contexto del tenant dado. */
  run<T>(centroId: string | null, fn: () => T): T {
    return this.store.run({ centroId }, fn);
  }
}
