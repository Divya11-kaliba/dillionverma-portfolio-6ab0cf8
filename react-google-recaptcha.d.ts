// react-google-recaptcha.d.ts
declare module 'react-google-recaptcha' {
    import * as React from 'react';
  
    interface ReCAPTCHAProps {
      sitekey: string;
      onChange?: (value: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      theme?: 'light' | 'dark';
      size?: 'compact' | 'normal' | 'invisible';
      tabindex?: number;
      badge?: 'bottomright' | 'inline' | 'bottomleft';
      hl?: string;
    }
  
    export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
      reset() {
        throw new Error('Method not implemented.');
      }
}
  }
  