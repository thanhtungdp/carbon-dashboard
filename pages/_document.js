/*
In production the stylesheet is compiled to .next/static/style.css.
The file will be served from /_next/static/style.css
You could include it into the page using either next/head or a custom _document.js.
*/
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { createEnvsFromList } from 'env'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    const scriptEnv = `window.__ENV__ = ${JSON.stringify(
      createEnvsFromList()
    )};`
    return (
      <html>
        <Head>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link
            rel='shortcut icon'
            href='/static/images/logo-icon.png'
            type='image/png'
          />
          <link rel='stylesheet' href='/_next/static/style.css' />
          {this.props.styleTags}
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <script dangerouslySetInnerHTML={{ __html: scriptEnv }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
