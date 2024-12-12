import { useEffect, useRef } from 'react';

interface AltchaProps {
  onVerify: (isValid: boolean) => void;
}

const Altcha = ({ onVerify }: AltchaProps) => {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        if (ev?.detail?.state === 'verified') {
          onVerify(true);
        }
      }
    };

    const { current } = widgetRef;
    if (current) {
      import('altcha').then(() => {
        current.addEventListener('statechange', handleStateChange);
      });
      return () => {
        current.removeEventListener('statechange', handleStateChange);
      };
    }
  }, [onVerify]);

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/website-integration/#using-altcha-widget  */
  return (
    <altcha-widget
      ref={widgetRef}
      style={{
        '--altcha-max-width': '100%',
      }}
      challengeurl={`${process.env.NEXT_PUBLIC_API_URL}/captcha`}
    ></altcha-widget>
  );
};

Altcha.displayName = 'Altcha';

export default Altcha;
