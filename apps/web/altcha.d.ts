declare module 'altcha' {
  export interface AltchaWidget {
    addEventListener: (event: string, callback: (ev: Event) => void) => void;
    removeEventListener: (event: string, callback: (ev: Event) => void) => void;
  }

  export interface Altcha {
    challengeurl: string;
  }

  const altcha: AltchaWidget;
  export default altcha;
}
