import type { ImageProps } from "@unpic/svelte";
import { Session, User } from "better-auth";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session: Session | null;
      user: User | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module '@unpic/svelte' {
  import type { Component } from 'svelte';

  declare const Image: Component<ImageProps>
}



export { };
