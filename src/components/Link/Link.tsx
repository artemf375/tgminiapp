import { useUtils, classNames, initNavigator, createBrowserNavigatorFromLocation, initHapticFeedback } from '@telegram-apps/sdk-react';
import { type FC, type MouseEventHandler, type JSX, useCallback, useEffect } from 'react';
import { type LinkProps as NextLinkProps, default as NextLink } from 'next/link';

import './styles.css';

export interface LinkProps extends NextLinkProps, Omit<JSX.IntrinsicElements['a'], 'href'> {
}

export const Link: FC<LinkProps> = ({
  className,
  onClick: propsOnClick,
  href,
  ...rest
}) => {
  const utils = useUtils();
  const hapticFeedback = initHapticFeedback();

  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    propsOnClick?.(e);    
    hapticFeedback.impactOccurred('soft');

    // navigator.push(href.toString());

    // navigator.attach().then(() => {
      
    // })

    // Compute if target path is external. In this case we would like to open link using
    // TMA method.
    let path: string;
    if (typeof href === 'string') {
      path = href;
    } else {
      const { search = '', pathname = '', hash = '' } = href;
      path = `${pathname}?${search}#${hash}`;
    }

    const targetUrl = new URL(path, window.location.toString());
    const currentUrl = new URL(window.location.toString());
    const isExternal = targetUrl.protocol !== currentUrl.protocol
      || targetUrl.host !== currentUrl.host;

    if (isExternal) {
      e.preventDefault();
      utils && utils.openLink(targetUrl.toString());
    }
  }, [href, propsOnClick, utils]);

  return (
    <NextLink
      {...rest}
      href={href}
      onClick={onClick}
      className={classNames(className, 'link')}
    />
  );
};
