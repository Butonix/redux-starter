/* eslint-disable react/no-danger */
import React from 'react';
import { array, object, node } from 'prop-types';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import cx from 'classnames';
import { isProd, host } from './../../app/config';
import i18n from '../../helpers/i18n';

const Html = ({
  assets,
  component,
  initialI18nStore,
  history: {
    location: {
      pathname
    }
  },
  lang,
  langs,
  store
}) => {
  const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`;
  const head = Helmet.rewind();
  const ie = '<!--[if lte IE 9]><div class="browsehappy"><div class="browsehappy__inner"><div class="browsehappy__message">You are using an <strong>outdated</strong> browser.Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div></div></div><![endif]-->';
  const content = component ?
    renderToString(
      <I18nextProvider
        i18n={i18n}
        initialLanguage={lang.value}
        initialI18nStore={initialI18nStore}
      >
        {component}
      </I18nextProvider>
    )
    :
    null;

  return (
    <html lang={lang.value} className={cx({ rtl: lang.rtl })}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <meta charSet="utf-8" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        {/* favicons */}
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileImage" content="/favicons/192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
        <link rel="android-chrome" sizes="36x36" type="image/png" href="/favicons/android-chrome-36x36.png" />
        <link rel="android-chrome" sizes="48x48" type="image/png" href="/favicons/android-chrome-48x48.png" />
        <link rel="android-chrome" sizes="72x72" type="image/png" href="/favicons/android-chrome-72x72.png" />
        <link rel="android-chrome" sizes="96x96" type="image/png" href="/favicons/android-chrome-96x96.png" />
        <link rel="android-chrome" sizes="144x144" type="image/png" href="/favicons/android-chrome-144x144.png" />
        <link rel="android-chrome" sizes="192x192" type="image/png" href="/favicons/android-chrome-192x192.png" />
        <link rel="icon" sizes="194x194" type="image/png" href="/favicons/favicon-194x194.png" />
        <link rel="icon" sizes="96x96" type="image/png" href="/favicons/favicon-96x96.png" />
        <link rel="icon" sizes="32x32" type="image/png" href="/favicons/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" type="image/png" href="/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#62bf7c" />
        <meta name="msapplication-TileImage" content="/favicons/apple-touch-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href={host + pathname} />
        {langs.length > 0 && langs.map(c =>
          <link key={c.code} rel="alternate" href={host + (pathname.replace(`/${lang.value}`, `/${c.value}`))} hrefLang={c.code} />
        )}

        {/*
        <title></title>
        <meta name="description" content="" />
        */}
        {/* facebook */}
        <meta property="author" content="domain" />
        <meta property="og:site_name" content="domain.co" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.jpg" />
        {/*
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        */}
        {/* twitter */}
        <meta property="twitter:site" content="domain.co" />
        <meta property="twitter:domain" content="domain.co" />
        <meta property="twitter:creator" content="domain" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:image:src" content="/logo.jpg" />
        {/*
        <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        */}
        {/* styles */}
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
        {isProd && <link rel="preload" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" as="style" />}
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {isProd && assets.styles && Object.keys(assets.styles).map(
          c => <link href={assets.styles[c]} key={c} rel="stylesheet" type="text/css" charSet="UTF-8" />
        )}
        {/* styles will be preloaded */}
        {isProd && assets.styles && Object.keys(assets.styles).map(
          c => <link rel="preload" href={assets.styles[c]} key={c} as="style" />
        )}
        {isProd && <link rel="preload" href={assets.javascript.vendor} as="script" />}
        {isProd && <link rel="preload" href={assets.javascript.main} as="script" />}
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: ie }} />
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        {isProd && <script defer src={assets.javascript.vendor} />}
        <script defer src={assets.javascript.main} />
      </body>
    </html>
  );
};

Html.defaultProps = {
  component: null
};

Html.propTypes = {
  assets: object.isRequired,
  component: node,
  initialI18nStore: object.isRequired,
  history: object.isRequired,
  lang: object.isRequired,
  langs: array.isRequired,
  store: object.isRequired
};

export default Html;
